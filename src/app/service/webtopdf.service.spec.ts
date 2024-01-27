import { TestBed } from '@angular/core/testing';

import { WebtopdfService } from './webtopdf.service';

describe('WebtopdfService', () => {
  let service: WebtopdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebtopdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
