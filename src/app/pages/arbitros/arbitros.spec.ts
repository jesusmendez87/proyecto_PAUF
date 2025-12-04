import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arbitros } from './arbitros';

describe('Arbitros', () => {
  let component: Arbitros;
  let fixture: ComponentFixture<Arbitros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arbitros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Arbitros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
