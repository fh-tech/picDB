import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./modules/material.module";
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    ImageDetailsComponent,
    ImageSliderComponent
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
export class AppModule { }
