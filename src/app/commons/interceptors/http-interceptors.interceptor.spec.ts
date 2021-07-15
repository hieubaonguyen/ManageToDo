import { TestBed } from '@angular/core/testing';

import { HttpInterceptorsInterceptor } from './http-interceptors.interceptor';

describe('HttpInterceptorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInterceptorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorsInterceptor = TestBed.inject(HttpInterceptorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
