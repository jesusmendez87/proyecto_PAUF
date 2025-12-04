import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clasificaciones } from './clasificaciones';

describe('Clasificaciones', () => {
  let component: Clasificaciones;
  let fixture: ComponentFixture<Clasificaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clasificaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clasificaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
