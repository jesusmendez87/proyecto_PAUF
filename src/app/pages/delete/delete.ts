import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../core/models/user.model';
import { userService } from '../../core/services/ver-usuario';
import { DeleteService } from '../../core/services/delete-object';
import { FormsModule } from '@angular/forms';
import { Equipos } from '../equipos/equipos';
import { Iequipo } from '../../core/models/equipos.model';
import { VerEquipo } from '../../core/services/verEquipo';
import { VerPartido } from '../../core/services/verPartido';
import { Ipartido } from '../../core/models/partidos.model';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete.html',
  styleUrls: ['./delete.css'],
})
export class Delete implements OnInit {


  jugadores: IUser[] = [];
  arbitros: IUser[] = [];
  equipos: Iequipo[] = [];
  partidos: Ipartido[] =[];

  jugadorId: string = '';
  arbitroId: string = '';
  equipoId: string = '';
  partidoId: string  = '';

  constructor(
    private userService: userService,
    private deleteService: DeleteService,
    private verEquipo : VerEquipo,
    private verPartido: VerPartido

  ) { }

  ngOnInit() {
    this.cargarRol('jugador');
    this.cargarRol('arbitro');
    this.loadEquipos();
    this.loadPartidos();

  }

  cargarRol(rol: 'jugador' | 'arbitro') {
    this.userService.getUsersByRole(rol).subscribe({
      next: data => {
        if (rol === 'jugador') {
          this.jugadores = data;
        } else {
          this.arbitros = data;
        }
      },
      error: err => console.error(`Error cargando ${rol}`, err)
    });
  }



eliminarUsuario(id: string) {
  this.deleteService.delete('usuarios', id).subscribe({
    next: (res: any) => {
      console.log(res.message); // "Usuario eliminado correctamente"
    },
    error: err => console.error('Error eliminando usuario', err)
  });
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


  eliminarEquipo(id: string) {
    this.deleteService.delete('equipos', id).subscribe({
      next: () => {
        console.log('Equipo eliminado');
      },
      error: err => console.error('Error eliminando equipo', err)
    });
  }

  loadPartidos() {
    this.verPartido.getPartidos().subscribe({
      next: (data) => {
        this.partidos = data;
      },
      error: (err) => {
        console.error('Error al cargar los equipos:', err);
      }
    });
  }  

    eliminarPartidos(id: string) {
    this.deleteService.delete('partidos', id).subscribe({
      next: () => {
        console.log('Partido eliminado');
      },
      error: err => console.error('Error eliminando partido', err)
    });
  }

 }