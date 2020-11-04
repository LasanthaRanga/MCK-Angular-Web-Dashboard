import { TestBed } from '@angular/core/testing';

import { JobtypesService } from './jobtypes.service';

describe('JobtypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobtypesService = TestBed.get(JobtypesService);
    expect(service).toBeTruthy();
  });
});
