import { TestBed } from '@angular/core/testing';

import { DeleteObject } from './delete-object';

describe('DeleteObject', () => {
  let service: DeleteObject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteObject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
