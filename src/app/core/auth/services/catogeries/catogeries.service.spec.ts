import { TestBed } from '@angular/core/testing';
import { CatogeriesService } from './catogeries.service';

describe('CatogeriesService', () => {
  let service: CatogeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatogeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
