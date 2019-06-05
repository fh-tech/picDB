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

    // can only syncFolder if it has already been set sometime in the past
    syncFolder() {
        return this.http.put('http://127.0.0.1:5000/api/pictures', {
            path: this.photoFolder
        });
    }

    loadFolder(folder: string) {
        if (folder && folder !== this.photoFolder) {
            this.http.post('http://127.0.0.1:5000/api/pictures', {
                path: folder
            }).subscribe(
                res => {
                    this.config.storeConfig({folderPath: folder});
                    this.photoFolder = folder;
                },
                err => console.log(err)
            );
        }
    }

}






