import {TestBed} from '@angular/core/testing';

import {IpcListenerService} from './ipc-listener.service';
import {ElectronService} from '../electron.service';
import {NavigatorService} from '../navigator/navigator.service';
import {AppRoutingModule} from '../../modules/app-routing.module';
import {ChooseFolderPageComponent} from '../../components/choose-folder-page/choose-folder-page.component';
import {ImagePageComponent} from '../../components/image-page/image-page.component';
import {PhotographerPageComponent} from '../../components/photographer-page/photographer-page.component';
import {MaterialModule} from '../../modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SearchbarComponent} from '../../components/image-page/searchbar/searchbar.component';
import {ImageDetailsComponent} from '../../components/image-page/image-details/image-details.component';
import {ImageSliderComponent} from '../../components/image-page/image-slider/image-slider.component';
import {PhotographerListComponent} from '../../components/photographer-page/photographer-list/photographer-list.component';
import {AddPhotographerComponent} from '../../components/photographer-page/add-photographer/add-photographer.component';
import {SafeHtmlPipe} from '../../pipes/safe-html.pipe';
import {NameDisplayPipe} from '../../pipes/name-display.pipe';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {FolderService} from '../folder/folder.service';
import {StorageService} from '../storage/storage.service';
import {ConfigService} from '../config/config.service';
import {HttpClientModule} from '@angular/common/http';
import {ReportService} from '../report/report.service';

describe('IpcListenerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [ChooseFolderPageComponent, ImagePageComponent, PhotographerPageComponent, SearchbarComponent, ImageDetailsComponent, ImageSliderComponent, PhotographerListComponent, AddPhotographerComponent, SafeHtmlPipe, NameDisplayPipe, SlickCarouselComponent],
        providers: [IpcListenerService, ElectronService, NavigatorService, FolderService, StorageService, ConfigService, ReportService],
        imports: [AppRoutingModule, MaterialModule, ReactiveFormsModule, HttpClientModule]
    }));

    // it('should be created', () => {
    //     const service: IpcListenerService = TestBed.get(IpcListenerService);
    //     expect(service).toBeTruthy();
    // });
});
