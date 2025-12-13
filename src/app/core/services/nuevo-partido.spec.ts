import { TestBed } from '@angular/core/testing';

import { NuevoPartido } from './nuevo-partido';

describe('NuevoPartido', () => {
  let service: NuevoPartido;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoPartido);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
