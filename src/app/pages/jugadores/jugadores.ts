
import { partido } from './../../core/services/verPartido';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { VerPartido } from '../../core/services/verPartido';
import { Ipartido } from '../../core/models/partidos.model';
import { ChangeDetectorRef } from '@angular/core';
import { IActaEvento } from './../../core/services/verPartido';



@Component({
  selector: 'app-jugadores',
  imports: [CommonModule],
  templateUrl: './jugadores.html',
  standalone: true,
  styleUrl: './jugadores.css',
})
export class Jugadores{

  protected actas: IActaEvento[] = [];
  protected loading: boolean = true;
  protected error: string | null = null;

  constructor(
    private authService: AuthService,
    private verPartido: VerPartido,
    private cdr: ChangeDetectorRef

  ) {}


ngOnInit() {
  console.log('Iniciando carga de jugadores...');

  const user = this.authService.getCurrentUserid(); // objeto User o undefined
  console.log('Usuario actual:', user);

  this.cargarJugadores();
}


 private cargarJugadores(user?: any) {

this.verPartido.getActas().subscribe({
  next: (data: Ipartido) => {
    this.actas = data.acta ??[];


    console.log('Partido cargado:', data);

    this.loading = false;
  },
  error: err => {
    console.error('Error cargando actas:', err);
    this.error = 'No se pudieron cargar las actas';
    this.loading = false;
  }
});


}
}
