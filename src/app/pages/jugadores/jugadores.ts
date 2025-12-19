
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerPartido } from '../../core/services/verPartido';
import { Ipartido } from '../../core/models/partidos.model';
import { IActaEvento } from './../../core/services/verPartido';



@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugadores.html',

  styleUrl: './jugadores.css',
})
export class Jugadores {

  protected actas: IActaEvento[] = [];
  protected loading: boolean = true;
  protected error: string | null = null;

  constructor(
    private verPartido: VerPartido) { }


  ngOnInit() {
    console.log('Iniciando carga de jugadores...');
    this.cargarJugadores();
  }

  //accedemos a los jugadores que realmente han jugado algún partido según las actas de partidos

  private cargarJugadores() {
    this.verPartido.getActas().subscribe({
      next: (partidos: Ipartido[]) => {
        this.actas = partidos.flatMap(p => p.acta ?? []);  //hacemos un mapeado de las actas
        console.log('Todas las actas cargadas:', this.actas);
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
