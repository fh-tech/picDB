import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {PictureQuery} from '../../interfaces/picture-query';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {Picture} from '../../interfaces/picture';
import {filter, takeUntil, takeWhile, tap} from 'rxjs/operators';
import {isString} from 'util';

@Injectable()
export class SignalRService {

    private hubConnection: HubConnection;
    private connected: Promise<void> = null;
    
    //raw notify messages
    private notifyLoadObservable: Subject<number> = new Subject<number>();
    private notifyReadyObservable: Subject<string> = new Subject<string>();
    
    //combined notify msg
    private notifyObservable: () => Observable<number|string> = () =>
        merge(
            this.notifyLoadObservable.asObservable(),
            this.notifyReadyObservable.asObservable(),
        ).pipe(
            takeWhile((value => !isString(value)))
        );

    //this subject publishes a new observable each time a loading cycle is started
    private loads: Subject<Observable<number|string>> = new Subject();
    public loaderEventStream$: Observable<Observable<number|string>> = this.loads.asObservable();
    private loadState: 'loading'|'waiting' = 'waiting';
    
    
    private imageQuery: Subject<Picture[]> = new BehaviorSubject([]);
    imageQuery$: Observable<Picture[]> = this.imageQuery.asObservable();
    
    
    private imageShort: Subject<string[]> = new Subject();
    imageShort$: Observable<string[]> = this.imageShort.asObservable();
    
    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://127.0.0.1:5000/images')
            .build();
        
        this.hubConnection.on('imageQueryResponse', (result) => this.imageQuery.next(result));
        this.hubConnection.on('shortImageQueryResponse', (result) => this.imageShort.next(result));
        
        this.hubConnection.on('notifyLoadPercentage', (percent) => this.notifyLoadObservable.next(percent));
        this.hubConnection.on('notifyReady', () => this.notifyReadyObservable.next("complete")); 
        
        this.notifyObservable().subscribe((e) => {
            if(this.loadState == 'waiting'){
                this.loadState = 'loading';
                this.loads.next(this.notifyObservable());
            }
        });
        this.loads.subscribe({complete: () => {
            this.loadState = 'waiting';
            this.loads.next(this.notifyObservable()); 
        }});
    }

    connect(): Promise<void> {
        console.log('connecting to hub');
        this.connected = this.hubConnection.start();
        return this.connected;
    }

    // the promise returned by send resolves as soon as the client has sent the request to the server
    // does not wait for response of the server!
    // if the hub is not connected we try to connect first
    private send(methodName: string, args: any): Promise<void> {
        return this.connected.then(_ => this.hubConnection.send(methodName, args));
    }

    update(updateImage): Promise<void> {
        return this.send('update', updateImage);
    }
    
    query(query: PictureQuery): Promise<void> {
        return this.send('getQuery', query)
    }
}
