import { TestBed } from '@angular/core/testing';

import { IpcSenderService } from './ipc-sender.service';

describe('IpcSenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpcSenderService = TestBed.get(IpcSenderService);
    expect(service).toBeTruthy();
  });
});
