import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseFolderPageComponent} from './choose-folder-page.component';
import {MaterialModule} from '../../modules/material.module';
import {IpcSenderService} from '../../providers/ipc/ipc-sender.service';
import {ElectronService} from '../../providers/electron.service';

describe('ChooseFolderPageComponent', () => {
    let component: ChooseFolderPageComponent;
    let fixture: ComponentFixture<ChooseFolderPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChooseFolderPageComponent],
            providers: [ElectronService, IpcSenderService],
            imports: [MaterialModule]
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
