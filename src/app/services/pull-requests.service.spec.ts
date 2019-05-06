import { TestBed } from '@angular/core/testing';

import { PullRequestsService } from './pull-requests.service';

describe('PullRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PullRequestsService = TestBed.get(PullRequestsService);
    expect(service).toBeTruthy();
  });
});
