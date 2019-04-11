import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {PictureQuery} from '../../interfaces/picture-query';
import {load} from '@angular/core/src/render3';

@Injectable(
    {providedIn: 'root'}
)
export class SignalRService {

    private hubConnection: HubConnection;

    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl("http://127.0.0.1:5000/images")
            .build();

        this.hubConnection.on("notifyLoadPercent", loadPercent => {
            console.log(loadPercent);
        });

        this.hubConnection.on("notifyReady", () => {
            console.log("ready");
        });
        
        this.hubConnection.on("sendQueryResponse", result => {

            console.log("got stuff");
            console.log(result);
        });
    }
    
    update(updateImage) {
        return this.send("update", updateImage);
    }
    
    query(query: PictureQuery): Promise<void> {
        return this.send("getQuery", query)
    }

    connect(): Promise<void> {
        return this.hubConnection.start();
    }
    
    private send(methodName: string, args: any): Promise<void> {
        return this.hubConnection.send(methodName, args);
    }


}
