import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iequipo } from '../../core/models/equipos.model';
import { VerEquipo } from '../../core/services/verEquipo';
@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css',
})
export class Equipos {
  equipos: Iequipo[] = [];

  constructor(private verEquipo: VerEquipo) {
    this.loadEquipos();
  }
  // cargamos todos los equipos disponibles desde el servicio
  loadEquipos() {
    this.verEquipo.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
      },
      error: (err) => {
        console.error('Error al cargar los equipos:', err);
      }
    });
  }

}
