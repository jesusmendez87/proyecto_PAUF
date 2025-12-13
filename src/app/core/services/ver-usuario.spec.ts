import { TestBed } from '@angular/core/testing';

import { VerUsuario } from './ver-usuario';

describe('VerUsuario', () => {
  let service: VerUsuario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerUsuario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
