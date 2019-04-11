import {Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FolderService {

    private photoFolder: string;

    constructor(private config: ConfigService,
                private http: HttpClient) {
        this.photoFolder = config.readConfig().folderPath;
    }

    get photofolder() {
        return this.photoFolder;
    }

    set photofolder(photofolder: string) {
        this.photoFolder = photofolder;
    }
    
    loadNewFolder() {
        return this.http.post('http://127.0.0.1:5000/api/pictures', {
            path: this.photoFolder
        })
    }

}






