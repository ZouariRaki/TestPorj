import { TestBed } from '@angular/core/testing';

import { ServiceCoursService } from './service-cours.service';

describe('ServiceCoursService', () => {
  let service: ServiceCoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
