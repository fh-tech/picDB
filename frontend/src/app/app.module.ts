import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './modules/app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './modules/material.module';
import {SearchbarComponent} from './components/image-page/searchbar/searchbar.component';
import {ImageDetailsComponent} from './components/image-page/image-details/image-details.component';
import {ImageSliderComponent} from './components/image-page/image-slider/image-slider.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImagePageComponent} from './components/image-page/image-page.component';
import {FolderChoosePageComponent} from './components/folder-choose-page/folder-choose-page.component';
import {IpcService} from "./services/ipc.service";

@NgModule({
    declarations: [
        AppComponent,
        SearchbarComponent,
        ImageDetailsComponent,
        ImageSliderComponent,
        ImagePageComponent,
        FolderChoosePageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
