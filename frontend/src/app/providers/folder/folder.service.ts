import {Injectable} from '@angular/core';
import {ElectronService} from '../electron.service';
import {NavigatorService} from '../navigator/navigator.service';
import {ConfigService} from '../config/config.service';

@Injectable()
export class FolderService {

    private photoFolder: string;

    constructor(private electronService: ElectronService,
                private navigator: NavigatorService,
                private config: ConfigService) {

        console.log(config.readConfig().folderPath);
        this.photoFolder = config.readConfig().folderPath;

        electronService.ipcRenderer.on('folderPath', (event, message) => {
            if (message) {
                this.photoFolder = message;
                console.log(message);
                this.config.storeConfig({
                    folderPath: message
                });
                this.navigator.navigate(['images']);
            }
        });
    }

    get photofolder() {
        return this.photoFolder;
    }

    // TODO: progressbar rendern beim aufbau von daniel
    // TODO: websocket service schreiben
    // TODO: 3tes tab für photographer auswählen und abschicken/ aktualisieren

}






