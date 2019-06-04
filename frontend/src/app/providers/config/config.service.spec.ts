import {TestBed} from '@angular/core/testing';
import {ConfigService} from './config.service';
import {StorageService} from '../storage/storage.service';
import {ElectronService} from '../electron.service';


describe('ConfigService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [ StorageService, ConfigService, ElectronService ]
    }));

    it('should be created', () => {
        const service: ConfigService = TestBed.get(ConfigService);
        expect(service).toBeTruthy();
    });

});




