import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderChoosePageComponent } from './folder-choose-page.component';

describe('FolderChoosePageComponent', () => {
  let component: FolderChoosePageComponent;
  let fixture: ComponentFixture<FolderChoosePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderChoosePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderChoosePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
