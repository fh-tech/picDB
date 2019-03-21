import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IpcService} from './services/ipc.service';
import {SearchbarComponent} from './components/image-page/searchbar/searchbar.component';
import {ImageDetailsComponent} from './components/image-page/image-details/image-details.component';
import {FolderChoosePageComponent} from './components/folder-choose-page/folder-choose-page.component';
import {ImagePageComponent} from './components/image-page/image-page.component';
import {ImageSliderComponent} from './components/image-page/image-slider/image-slider.component';
import {AppRoutingModule} from './modules/app-routing.module';
import {MaterialModule} from './modules/material.module';

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
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [IpcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
