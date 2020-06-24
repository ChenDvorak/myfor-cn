import { TestBed } from '@angular/core/testing';

import { MustLoggedInGuard } from './must-logged-in.guard';

describe('MustLoggedInGuard', () => {
  let guard: MustLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MustLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
