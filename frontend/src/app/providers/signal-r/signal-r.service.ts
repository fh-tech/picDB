import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';

@Injectable(
    {providedIn: 'root'}
)
export class SignalRService {

    private hubConnection: HubConnection;

    constructor(url) {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(url)
            .build();

        this.hubConnection.on("notifyLoadPercent", loadPercent => {

            // spinner start
        });

        this.hubConnection.on("notifyReady", () => {

            // spinner stop
        });
    }
    
    update(updateImage) {
        this.send("update", updateImage);
    }
    
    query(query) {
        this.send("query", query)
    }

    connect(url) {
        this.hubConnection.start();
    }
    
    private send(methodName: string, args: any) {
        this.hubConnection.send(methodName, args)
    }


}
