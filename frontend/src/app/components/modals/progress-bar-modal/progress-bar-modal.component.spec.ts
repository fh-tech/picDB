import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarModalComponent } from './progress-bar-modal.component';
import {MaterialModule} from '../../../modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SignalRService} from '../../../providers/signal-r/signal-r.service';

describe('ProgressBarModalComponent', () => {
  let component: ProgressBarModalComponent;
  let fixture: ComponentFixture<ProgressBarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarModalComponent ],
      providers: [SignalRService],
      imports: [MaterialModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
