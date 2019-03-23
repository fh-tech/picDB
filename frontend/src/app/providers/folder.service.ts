import {Injectable} from '@angular/core';
import {ElectronService} from './electron.service';
import {NavigatorService} from './navigator.service';

@Injectable()
export class FolderService {

    private photoFolder: string;

    constructor(private electronService: ElectronService,
                private navigator: NavigatorService) {

        electronService.ipcRenderer.on('folderPath', (event, message) => {
            if (message) {
                this.photoFolder = message;
                console.log(message);
                this.navigator.navigate(['images']);
            }
        });
    }

    get photofolder() {
        return this.photoFolder;
    }
}






