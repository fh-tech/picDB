import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotographerListComponent} from './photographer-list.component';
import {PhotographersService} from '../../../providers/photographers/photographers.service';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../modules/material.module';

describe('PhotographerListComponent', () => {
    let component: PhotographerListComponent;
    let fixture: ComponentFixture<PhotographerListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PhotographerListComponent],
            providers: [PhotographersService],
            imports: [HttpClientModule, MaterialModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhotographerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
