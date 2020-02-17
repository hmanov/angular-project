import { TestBed } from '@angular/core/testing';

import { ContactsInterceptor } from './contacts.interceptor';

describe('ContactsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ContactsInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: ContactsInterceptor = TestBed.inject(ContactsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
