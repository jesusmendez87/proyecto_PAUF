import { TestBed } from '@angular/core/testing';

import { VerPartido } from './ver-partido';

describe('VerPartido', () => {
  let service: VerPartido;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerPartido);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
