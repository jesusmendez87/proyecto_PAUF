import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NuevoPartido } from '../../core/services/nuevo-partido';
import { VerEquipo } from '../../core/services/verEquipo';
import { Iequipo } from '../../core/models/equipos.model';
import { userService } from '../../core/services/ver-usuario';
import { IUser } from '../../core/models/user.model';





@Component({
  selector: 'app-competiciones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './competiciones.html',
  styleUrl: './competiciones.css',
})


export class Competiciones {
  local_id: string = '';
  visitante_id: string = '';
  arbitro_id: string = '';
  lugar: string = '';
  fecha: Date = new Date();
  deporte: string = '';
  equipoSeleccionado: string | undefined;
  arbitroSeleccionado: string | undefined;
  equipo: Iequipo[] = [];
  arbitros: IUser[] = [];




  loading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;



  constructor(
    private registerService: NuevoPartido,
    private userService: userService,
    private verEquipo: VerEquipo,
    private router: Router
  ) { }

  //necesitamos cargar todos los arbitros y los equipos registrados para utilizarlos en los select
  ngOnInit() {
    this.cargarEquipos();
    this.cargarArbitros();
  }


  cargarArbitros() {
    this.userService.getUsersByRole('arbitro').subscribe({  //hacemos get sólo de arbitros
      next: (res) => {
        this.arbitros = res;
        console.log("Arbitros cargados:", this.arbitros);
      },
      error: (err) => {
        console.error("Error cargando arbitro:", err);
      }
    });
  }


  cargarEquipos() {
    this.verEquipo.getEquipos().subscribe({ // hacemos get de todos los equípos
      next: (res) => {
        this.equipo = res;
        console.log("Equipos cargados:", this.equipo);
      },
      error: (err) => {
        console.error("Error cargando equipos:", err);
      }
    });
  }

  nuevoPartido() {
    if (!this.local_id || !this.visitante_id || !this.arbitro_id || !this.lugar || !this.fecha || !this.deporte) {
      this.errorMessage = 'Rellena todos los campos';
      return;
    }


    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;



    this.registerService.nuevoPartido(this.local_id, this.visitante_id, this.arbitro_id, this.lugar, this.fecha, this.deporte).subscribe({
      next: (res) => {
        this.successMessage = res?.message || 'Partido creado exitosamente';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/Competiciones']), 1000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || err?.message || 'Error en el registro';
        this.loading = false;
      }
    });
  }
}
