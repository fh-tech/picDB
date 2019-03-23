import { TestBed } from '@angular/core/testing';

import { ImageFolderGuardService } from './image-folder-guard.service';

describe('ImageFolderGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageFolderGuardService = TestBed.get(ImageFolderGuardService);
    expect(service).toBeTruthy();
  });
});
