import { TestBed } from '@angular/core/testing';

import { BusService } from './bus.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BusService', () => {
  let service: BusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BusService],
    });
    service = TestBed.inject(BusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
