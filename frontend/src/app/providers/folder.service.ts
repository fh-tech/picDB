import { Injectable } from '@angular/core';
import {IpcService} from './ipc.service';

@Injectable()
export class FolderService {

  photoFolder: string;

  constructor(private ipc: IpcService) { }

  async setFolderPath() {
    const folders = await this.ipc.send('getFolderPath', 'returnFolderPath');
    this.photoFolder = folders[0];
  }




}
