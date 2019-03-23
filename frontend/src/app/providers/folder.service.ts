import { Injectable } from '@angular/core';
import {ElectronService} from './electron.service';

@Injectable()
export class FolderService {

  private photoFolder: string;

  constructor(private electronService: ElectronService) {
    electronService.ipcRenderer.on('folderPath', (event, message) => {
      console.log(message);
      this.photoFolder = message;
    });
  }

  get photofolder() {
    return this.photoFolder;
  }
}






