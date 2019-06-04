import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImagePageComponent} from './image-page.component';
import {ImageDetailsComponent} from './image-details/image-details.component';
import {SafeHtmlPipe} from '../../pipes/safe-html.pipe';
import {NameDisplayPipe} from '../../pipes/name-display.pipe';
import {SignalRService} from '../../providers/signal-r/signal-r.service';
import {PhotographersService} from '../../providers/photographers/photographers.service';
import {MaterialModule} from '../../modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {ImageSliderComponent} from './image-slider/image-slider.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {ImageService} from '../../providers/image/image.service';

describe('ImagePageComponent', () => {
    let component: ImagePageComponent;
    let fixture: ComponentFixture<ImagePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImagePageComponent, SearchbarComponent, ImageSliderComponent, ImageDetailsComponent, SafeHtmlPipe, NameDisplayPipe],
            providers: [SignalRService, PhotographersService, ImageService],
            imports: [MaterialModule, SlickCarouselModule, FormsModule, ReactiveFormsModule, HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImagePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
