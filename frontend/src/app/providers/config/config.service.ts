import {Injectable} from '@angular/core';
import {PicDBConfig} from '../../interfaces/pic-dbconfig';
import {StorageService} from '../storage/storage.service';

@Injectable()
export class ConfigService {

    private readonly defaultPicDBConfig: PicDBConfig = {
        folderPath: ''
    };

    private readonly fileName = 'picDB';

    constructor(private storage: StorageService) {}

    storeConfig(config: PicDBConfig) {
        this.storage.store(this.fileName, config);
    }

    readConfig(): PicDBConfig {
        try {
            return JSON.parse(JSON.stringify(this.storage.read(this.fileName)));
        } catch (e) {
            return this.defaultPicDBConfig;
        }

    }

}
