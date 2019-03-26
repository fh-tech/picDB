import { Injectable } from '@angular/core';
import {ElectronService} from '../electron.service';

@Injectable()
export class IpcSenderService {

  constructor(private electronService: ElectronService) { }


    public async send(channel: string, listener: string) {
        return new Promise<string[]>((resolve, reject) => {
            this.electronService.ipcRenderer.once(listener, (event, arg) => {
                resolve(arg);
            });
            this.electronService.ipcRenderer.send(channel);
        });
    }

    public sendMessage(channel: string) {
      this.electronService.ipcRenderer.send(channel);
    }
}
