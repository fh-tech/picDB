import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailsComponent } from './image-details.component';
import {MaterialModule} from '../../../modules/material.module';
import {SafeHtmlPipe} from '../../../pipes/safe-html.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NameDisplayPipe} from '../../../pipes/name-display.pipe';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SignalRService} from '../../../providers/signal-r/signal-r.service';
import {ReportService} from '../../../providers/report/report.service';

describe('ImageDetailsComponent', () => {
  let component: ImageDetailsComponent;
  let fixture: ComponentFixture<ImageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailsComponent, SafeHtmlPipe, NameDisplayPipe ],
      providers: [SignalRService, PhotographersService, ReportService],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
