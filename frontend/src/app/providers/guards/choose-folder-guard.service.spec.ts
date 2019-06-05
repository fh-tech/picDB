import { TestBed } from '@angular/core/testing';

import { ChooseFolderGuardService } from './choose-folder-guard.service';
import {FolderService} from '../folder/folder.service';
import {ConfigService} from '../config/config.service';
import {StorageService} from '../storage/storage.service';
import {ElectronService} from '../electron.service';
import {HttpClientModule} from '@angular/common/http';
import {ChooseFolderPageComponent} from '../../components/choose-folder-page/choose-folder-page.component';
import {MaterialModule} from '../../modules/material.module';
import {NavigatorService} from '../navigator/navigator.service';

describe('ChooseFolderGuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [ChooseFolderPageComponent],
        providers: [
            ChooseFolderGuardService,
            NavigatorService,
            FolderService,
            ConfigService,
            StorageService,
            ElectronService
        ],
        imports: [
            HttpClientModule,
            MaterialModule
        ]
    }));

    // it('should be created', () => {
    //     const service: ChooseFolderGuardService = TestBed.get(ChooseFolderGuardService);
    //     expect(service).toBeTruthy();
    // });
});
