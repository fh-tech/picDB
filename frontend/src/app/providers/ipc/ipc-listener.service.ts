import {Injectable} from '@angular/core';
import {ElectronService} from '../electron.service';
import {NavigatorService} from '../navigator/navigator.service';
import {FolderService} from '../folder/folder.service';
import {ConfigService} from '../config/config.service';
import {SignalRService} from '../signal-r/signal-r.service';

@Injectable()
export class IpcListenerService {

    constructor(private electronService: ElectronService,
                private navigator: NavigatorService,
                private folderService: FolderService,
                private configService: ConfigService,
                private signalR: SignalRService) {

        electronService.ipcRenderer.on('photographers', (event, message) => {
            this.navigator.navigate(['photographers']);
        });

        electronService.ipcRenderer.on('images', (event, message) => {
            this.navigator.navigate(['images']);
        });

        electronService.ipcRenderer.on('folderPath', (event, message) => {
            this.folderService.loadFolder(message);
        });
    }
}
