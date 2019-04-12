import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFolderPageComponent } from './choose-folder-page.component';

describe('ChooseFolderPageComponent', () => {
  let component: ChooseFolderPageComponent;
  let fixture: ComponentFixture<ChooseFolderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFolderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFolderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
