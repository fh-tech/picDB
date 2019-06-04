import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPhotographerComponent} from './add-photographer.component';
import {MaterialModule} from '../../../modules/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {HttpClientModule} from '@angular/common/http';

describe('AddPhotographerComponent', () => {
    let component: AddPhotographerComponent;
    let fixture: ComponentFixture<AddPhotographerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddPhotographerComponent],
            providers: [PhotographersService],
            imports: [MaterialModule, ReactiveFormsModule, HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPhotographerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
