import {TestBed} from '@angular/core/testing';

import {SignalRService} from './signal-r.service';

describe('SignalRService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [],
        providers: [SignalRService],
        imports: []
    }));

    it('should be created', () => {
        const service: SignalRService = TestBed.get(SignalRService);
        expect(service).toBeTruthy();
    });
});
