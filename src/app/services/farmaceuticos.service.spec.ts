import { TestBed } from '@angular/core/testing';

import { FarmaceuticosService } from './farmaceuticos.service';

describe('FarmaceuticosService', () => {
  let service: FarmaceuticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmaceuticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
