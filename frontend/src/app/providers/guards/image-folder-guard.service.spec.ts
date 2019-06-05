import {TestBed} from '@angular/core/testing';

import {ImageFolderGuardService} from './image-folder-guard.service';
import {StorageService} from '../storage/storage.service';
import {ElectronService} from '../electron.service';
import {FolderService} from '../folder/folder.service';
import {NavigatorService} from '../navigator/navigator.service';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from '../config/config.service';
import {AppRoutingModule} from '../../modules/app-routing.module';
import {ChooseFolderPageComponent} from '../../components/choose-folder-page/choose-folder-page.component';

describe('ImageFolderGuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [ChooseFolderPageComponent],
        providers: [
            ImageFolderGuardService,
            ConfigService,
            StorageService,
            ElectronService,
            FolderService,
            NavigatorService
        ],
        imports: [
            HttpClientModule,
            AppRoutingModule
        ]
    }));

    // it('should be created', () => {
    //     const service: ImageFolderGuardService = TestBed.get(ImageFolderGuardService);
    //     expect(service).toBeTruthy();
    // });
});
