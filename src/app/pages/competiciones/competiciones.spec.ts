import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competiciones } from './competiciones';

describe('Competiciones', () => {
  let component: Competiciones;
  let fixture: ComponentFixture<Competiciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Competiciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competiciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
