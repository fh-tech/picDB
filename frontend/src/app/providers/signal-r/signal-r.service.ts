import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {PictureQuery} from '../../interfaces/picture-query';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Picture} from '../../interfaces/picture';

@Injectable()
export class SignalRService {

    private hubConnection: HubConnection;
    private connected: Promise<void> = null;
    
    private loadMsg: Subject<number> = new BehaviorSubject(0.0);
    loadMsg$: Observable<number> = this.loadMsg.asObservable();
    
    private imageQuery: Subject<Picture[]> = new BehaviorSubject([]);
    imageQuery$: Observable<Picture[]> = this.imageQuery.asObservable();
    
    private imageShort: Subject<string[]> = new Subject();
    imageShort$: Observable<string[]> = this.imageShort.asObservable();
    
    
    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://127.0.0.1:5000/images')
            .build();
        
        this.hubConnection.on('notifyLoadPercent', (loadPercent) => this.loadMsg.next(loadPercent));
        this.hubConnection.on('notifyReady', (_) => this.loadMsg.complete());
        this.hubConnection.on('imageQueryResponse', (result) => this.imageQuery.next(result));
        this.hubConnection.on('shortImageQueryResponse', (result) => this.imageShort.next(result));
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

    // query(query: PictureQuery): Promise<any> {
    //     return this.send('getQuery', query).then(_ => {
    //         return new Promise(async (resolve, reject) => {
    //             await this.hubConnection.on('sendQueryResponse', result => {
    //                 resolve(result);
    //             });
    //             setTimeout(_ => reject(), 5000);
    //         });
    //     });
    // }
}
