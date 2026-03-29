import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Jugadores } from './jugadores';
import { VerPartido } from '../../core/services/verPartido';

describe('Jugadores', () => {

  let verPartidoMock: any;

  beforeEach(async () => {

    verPartidoMock = {
      getActas: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [Jugadores],
      providers: [
        { provide: VerPartido, useValue: verPartidoMock }
      ]
    }).compileComponents();
  });

  it('Verifica creación del componente', () => {
    verPartidoMock.getActas.and.returnValue(of([]));

    const fixture = TestBed.createComponent(Jugadores);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('Cargar los jugadores del mocks  ', () => {

    const mockData = [
      { acta: [{ jugador: 'Juan' }, { jugador: 'Pedro' }] }
    ];

    verPartidoMock.getActas.and.returnValue(of(mockData));

    const fixture = TestBed.createComponent(Jugadores);
    const component = fixture.componentInstance;

    fixture.detectChanges(); // dispara ngOnInit

    expect(component['actas'].length).toBe(2);
    expect(component['loading']).toBeFalse();
  });

    it('Debe contener al jugador Pedro', () => {

    const mockData = [
      { acta: [{ jugador: 'Juan' }, { jugador: 'Pedro' }] }
    ];

    verPartidoMock.getActas.and.returnValue(of(mockData));

    const fixture = TestBed.createComponent(Jugadores);
    const component = fixture.componentInstance;

    fixture.detectChanges(); // dispara ngOnInit

    expect(component['actas'].some(acta => acta.jugador === 'Pedro')).toBeTrue();
  });

  it('Debe dar error de cabeceras', () => {

    verPartidoMock.getActas.and.returnValue(
      throwError(() => new Error('Error'))
    );

    const fixture = TestBed.createComponent(Jugadores);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component['error']).toBe('No se pudieron cargar las actas');
    expect(component['loading']).toBeFalse();
  });

});
