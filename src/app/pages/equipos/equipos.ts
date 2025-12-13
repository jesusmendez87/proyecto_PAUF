import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
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

  constructor(private verEquipo: VerEquipo, private router: Router) {
    this.loadEquipos();
  }

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
  goToEquipoDetails(equipo: Iequipo) {
    this.router.navigate(['/equipo-detalles', equipo.name]);
  }

}
