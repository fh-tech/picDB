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


    // TODO: local storage options (vermutlich dann service) for electron-angular (folder speichern und neu laden beim startup)
    // TODO: progressbar rendern beim aufbau von daniel
    // TODO: websocket service schreiben
    // TODO: photographer service
    // TODO photographer page designen
    // TODO: photographer page navigaten nach menubar auswählen
    // TODO: 3tes tab für photographer auswählen und abschicken/ aktualisieren

}






