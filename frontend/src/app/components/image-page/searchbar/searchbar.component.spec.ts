import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchbarComponent} from './searchbar.component';
import {MaterialModule} from '../../../modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageService} from '../../../providers/image/image.service';
import {SignalRService} from '../../../providers/signal-r/signal-r.service';
import {HttpClientModule} from '@angular/common/http';

describe('SearchbarComponent', () => {
    let component: SearchbarComponent;
    let fixture: ComponentFixture<SearchbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchbarComponent],
            imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule],
            providers: [ImageService, SignalRService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
