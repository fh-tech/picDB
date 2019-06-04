import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderComponent } from './image-slider.component';
import {MaterialModule} from '../../../modules/material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {SafeHtmlPipe} from '../../../pipes/safe-html.pipe';

describe('ImageSliderComponent', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSliderComponent, SafeHtmlPipe],
      providers: [],
      imports: [MaterialModule, NgbModule, FormsModule, ReactiveFormsModule, SlickCarouselModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
