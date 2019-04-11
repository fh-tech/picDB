import {Injectable} from '@angular/core';
import {ElectronService} from '../electron.service';
import {NavigatorService} from '../navigator/navigator.service';
import {FolderService} from '../folder/folder.service';
import {ConfigService} from '../config/config.service';

@Injectable()
export class IpcListenerService {

    constructor(private electronService: ElectronService,
                private navigator: NavigatorService,
                private folderService: FolderService,
                private configService: ConfigService) {

        electronService.ipcRenderer.on('photographers', (event, message) => {
            this.navigator.navigate(['photographers']);
        });

        electronService.ipcRenderer.on('images', (event, message) => {
            this.navigator.navigate(['images']);
        });

        electronService.ipcRenderer.on('folderPath', (event, message) => {
            if (message) {
                console.log("got folder path");
                folderService.photofolder = message;
                this.configService.storeConfig({
                    folderPath: message
                });
                console.log(folderService.photofolder);
                this.folderService.loadNewFolder().subscribe();
                this.navigator.navigate(['images']);
            }
        });
    }
}
