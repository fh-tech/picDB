import { Injectable } from '@angular/core';
import {ElectronService} from './electron.service';

@Injectable()
export class FolderService {

  photoFolder: string;

  constructor(private electronService: ElectronService) {
    electronService.ipcRenderer.on('folderPath', (event, message) => {
      this.photoFolder = message;
      console.log(message);
    });
  }
}






