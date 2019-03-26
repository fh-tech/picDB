import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './modules/app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';

import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {ImagePageComponent} from './components/image-page/image-page.component';
import {ImageDetailsComponent} from './components/image-page/image-details/image-details.component';
import {SearchbarComponent} from './components/image-page/searchbar/searchbar.component';
import {ImageSliderComponent} from './components/image-page/image-slider/image-slider.component';
import {MaterialModule} from './modules/material.module';
import {FolderService} from './providers/folder/folder.service';
import {ChooseFolderPageComponent} from './components/choose-folder-page/choose-folder-page.component';
import {ImageFolderGuardService} from './providers/guards/image-folder-guard.service';
import {ChooseFolderGuardService} from './providers/guards/choose-folder-guard.service';
import {NavigatorService} from './providers/navigator/navigator.service';
import {StorageService} from './providers/storage/storage.service';
import {ConfigService} from './providers/config/config.service';
import {PhotographersService} from './providers/photographers/photographers.service';
import {PhotographerListComponent} from './components/photographer-page/photographer-list/photographer-list.component';
import {AddPhotographerComponent} from './components/photographer-page/add-photographer/add-photographer.component';
import {PhotographerPageComponent} from './components/photographer-page/photographer-page.component';
import {IpcListenerService} from './providers/ipc/ipc-listener.service';
import {IpcSenderService} from './providers/ipc/ipc-sender.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        ImagePageComponent,
        ImageDetailsComponent,
        SearchbarComponent,
        ImageSliderComponent,
        WebviewDirective,
        ChooseFolderPageComponent,
        PhotographerPageComponent,
        PhotographerListComponent,
        AddPhotographerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ElectronService,
        FolderService,
        ImageFolderGuardService,
        ChooseFolderGuardService,
        NavigatorService,
        StorageService,
        ConfigService,
        PhotographersService,
        IpcListenerService,
        IpcSenderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
