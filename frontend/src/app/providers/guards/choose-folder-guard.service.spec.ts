import { TestBed } from '@angular/core/testing';

import { ChooseFolderGuardService } from './choose-folder-guard.service';

describe('ChooseFolderGuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ChooseFolderGuardService = TestBed.get(ChooseFolderGuardService);
        expect(service).toBeTruthy();
    });
});
