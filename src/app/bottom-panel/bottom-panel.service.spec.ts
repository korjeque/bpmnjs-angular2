import { TestBed, inject } from '@angular/core/testing';

import { BottomPanelService } from './bottom-panel.service';

describe('BottomPanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BottomPanelService]
    });
  });

  it('should be created', inject([BottomPanelService], (service: BottomPanelService) => {
    expect(service).toBeTruthy();
  }));
});
