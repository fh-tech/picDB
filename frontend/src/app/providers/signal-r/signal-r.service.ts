import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {PictureQuery} from '../../interfaces/picture-query';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {Picture} from '../../interfaces/picture';
import {takeWhile} from 'rxjs/operators';
import {isString} from 'util';
import {ImageService} from '../image/image.service';

export type LoadState = 'loading' | 'waiting';

@Injectable()
export class SignalRService {

    private hubConnection: HubConnection;
    private connected: Promise<void> = null;

    private refreshFolderSubject = new BehaviorSubject(false);
    public refreshFolder$ = this.refreshFolderSubject.asObservable();

    //raw notify messages
    private notifyLoadObservable: Subject<number> = new Subject<number>();
    private notifyReadyObservable: Subject<string> = new Subject<string>();

    //combined notify msg
    private notifyObservable: () => Observable<number | string> = () =>
        merge(
            this.notifyLoadObservable.asObservable(),
            this.notifyReadyObservable.asObservable(),
        ).pipe(
            // completes observable 
            takeWhile((value => !isString(value)))
        );

    //this subject publishes a new observable each time a loading cycle is started
    private loads: Subject<Observable<number | string>> = new Subject();
    public loaderEventStream$: Observable<Observable<number | string>> = this.loads.asObservable();

    private loadState: LoadState = 'waiting';
    private loadStateSub$: Subject<LoadState> = new BehaviorSubject<LoadState>('waiting');
    public loadState$ = this.loadStateSub$.asObservable();

    private imageQuery: Subject<Picture[]> = new BehaviorSubject([]);
    imageQuery$: Observable<Picture[]> = this.imageQuery.asObservable();

    private imageShort: Subject<string[]> = new Subject();
    imageShort$: Observable<string[]> = this.imageShort.asObservable();


    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://127.0.0.1:5000/images')
            .build();

        this.hubConnection.on('imageQueryResponse', (result) => {
            this.imageQuery.next(result);
        });
        this.hubConnection.on('shortImageQueryResponse', (result) => this.imageShort.next(result));

        this.hubConnection.on('notifyLoadPercentage', (percent) => this.notifyLoadObservable.next(percent));
        this.hubConnection.on('notifyReady', () => this.notifyReadyObservable.next('complete'));

        //if any notify msg is received we want to check if we want to change state to loading
        this.subscribeNotifications();

        // if the inner observable completes all images are loaded and we are waiting for another loading cycle
        this.loaderEventStream$.subscribe(o => o.subscribe({
            complete: () => {
                this.loadState = 'waiting';
                this.loadStateSub$.next('waiting');
                this.loads.next(this.notifyObservable());
                this.subscribeNotifications();
                this.refreshFolderSubject.next(true);
            }
        }));
    }

    connect(): Promise<void> {
        this.connected = this.hubConnection.start();
        return this.connected;
    }
    
    private send(methodName: string, args: any): Promise<void> {
        if(this.connected) {
            return this.connected.then(_ => this.hubConnection.send(methodName, args));
        }
    }

    update(updateImage): Promise<void> {
        return this.send('update', updateImage);
    }

    query(query: PictureQuery): Promise<void> {
        return this.send('getQuery', query);
    }


    private subscribeNotifications() {
        this.notifyObservable().subscribe((e) => {
            if (this.loadState == 'waiting') {
                this.loadState = 'loading';
                this.loadStateSub$.next('loading');
                this.loads.next(this.notifyObservable());
            }
        });
    }
}
