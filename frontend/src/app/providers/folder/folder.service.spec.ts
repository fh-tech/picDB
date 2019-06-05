import {TestBed} from '@angular/core/testing';

import {FolderService} from './folder.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from '../config/config.service';
import {StorageService} from '../storage/storage.service';
import {ElectronService} from '../electron.service';
import {NavigatorService} from '../navigator/navigator.service';

describe('FolderService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            ConfigService,
            StorageService,
            ElectronService,
            FolderService,
            NavigatorService
        ],
        imports: [
            HttpClientModule
        ]
    }));

    it('should be created', () => {
        const service: FolderService = TestBed.get(FolderService);
        expect(service).toBeTruthy();
    });

});

