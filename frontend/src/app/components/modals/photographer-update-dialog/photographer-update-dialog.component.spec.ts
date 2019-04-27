import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerUpdateDialogComponent } from './photographer-update-dialog.component';

describe('PhotographerUpdateDialogComponent', () => {
  let component: PhotographerUpdateDialogComponent;
  let fixture: ComponentFixture<PhotographerUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
