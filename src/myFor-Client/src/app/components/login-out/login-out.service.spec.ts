import { TestBed } from '@angular/core/testing';

import { LoginOutService } from './login-out.service';

describe('LoginOutService', () => {
  let service: LoginOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
