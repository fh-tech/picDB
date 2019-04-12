import {Injectable} from '@angular/core';
import {ElectronService} from '../electron.service';

@Injectable()
export class StorageService {

    constructor(private electronService: ElectronService) {}

    store(filename: string, obj: Object) {
        this.electronService.fs.writeFileSync(this.getFilePath(filename), JSON.stringify(obj));
    }

    public read(filename: string): JSON {
        try {
            const path = this.getFilePath(filename);
            return JSON.parse(this.electronService.fs.readFileSync(path).toString());
        } catch (e) {
            throw e;
        }
    }

    private getFilePath(filename: string) {
        return this.getUserPath() + '/' + filename + '.json';
    }


    private getUserPath(): string {
        return this.electronService.remote.app.getPath('userData');
    }


}
