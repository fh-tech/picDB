import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';

@Injectable()
export class FolderService {

    private photoFolder: string;

    constructor(private config: ConfigService) {

        console.log(config.readConfig().folderPath);
        this.photoFolder = config.readConfig().folderPath;
    }

    get photofolder() {
        return this.photoFolder;
    }

    set photofolder(photofolder: string) {
        this.photoFolder = photofolder;
    }

    // TODO: progressbar rendern beim aufbau von daniel
    // TODO: websocket service schreiben
    // TODO: 3tes tab für photographer auswählen und abschicken/ aktualisieren

}






