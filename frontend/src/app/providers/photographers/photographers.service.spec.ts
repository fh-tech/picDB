import {TestBed} from '@angular/core/testing';

import {PhotographersService} from './photographers.service';
import {HttpClientModule} from '@angular/common/http';

describe('PhotographersService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [],
        providers: [PhotographersService],
        imports: [HttpClientModule]
    }));

    it('should be created', () => {
        const service: PhotographersService = TestBed.get(PhotographersService);
        expect(service).toBeTruthy();
    });
});
