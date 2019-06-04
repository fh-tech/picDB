import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotographerPageComponent} from './photographer-page.component';
import {MaterialModule} from '../../modules/material.module';
import {PhotographersService} from '../../providers/photographers/photographers.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PhotographerListComponent} from './photographer-list/photographer-list.component';
import {AddPhotographerComponent} from './add-photographer/add-photographer.component';
import {HttpClientModule} from '@angular/common/http';

describe('PhotographerPageComponent', () => {
    let component: PhotographerPageComponent;
    let fixture: ComponentFixture<PhotographerPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PhotographerPageComponent, PhotographerListComponent, AddPhotographerComponent],
            providers: [PhotographersService],
            imports: [MaterialModule, ReactiveFormsModule, NgbModule, HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhotographerPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fail);
    });
});
