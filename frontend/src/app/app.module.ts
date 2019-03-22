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
import {FolderChoosePageComponent} from './components/folder-choose-page/folder-choose-page.component';
import {ImagePageComponent} from './components/image-page/image-page.component';
import {ImageDetailsComponent} from './components/image-page/image-details/image-details.component';
import {SearchbarComponent} from './components/image-page/searchbar/searchbar.component';
import {ImageSliderComponent} from './components/image-page/image-slider/image-slider.component';
import {MaterialModule} from './modules/material.module';
import {FolderService} from './providers/folder.service';
import {IpcService} from './providers/ipc.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        FolderChoosePageComponent,
        ImagePageComponent,
        ImageDetailsComponent,
        SearchbarComponent,
        ImageSliderComponent,
        WebviewDirective
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
        IpcService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
