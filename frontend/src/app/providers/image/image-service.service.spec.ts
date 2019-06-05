import {TestBed} from '@angular/core/testing';

import {ImageService} from './image.service';
import {HttpClientModule} from '@angular/common/http';
import {SignalRService} from '../signal-r/signal-r.service';

describe('ImageServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [ImageService, SignalRService],
        imports: [HttpClientModule]
    }));

    it('should be created', () => {
        const service: ImageService = TestBed.get(ImageService);
        expect(service).toBeTruthy();
    });
});
