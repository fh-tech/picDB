import { Injectable } from '@angular/core';
import {IpcRenderer} from 'electron';

@Injectable()
export class IpcService {
  private ipc: IpcRenderer;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }

  public async send(channel: string, listener: string) {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.once(listener, (event, arg) => {
        resolve(arg);
      });
      this.ipc.send(channel);
    });
  }
}

