import { TestBed } from '@angular/core/testing';

import { IpcListenerService } from './ipc-listener.service';

describe('IpcListenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpcListenerService = TestBed.get(IpcListenerService);
    expect(service).toBeTruthy();
  });
});
