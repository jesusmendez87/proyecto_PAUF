import { partido } from './../../core/services/verPartido';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { VerPartido } from '../../core/services/verPartido';
import { Ipartido } from '../../core/models/partidos.model';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-clasificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clasificaciones.html',
  styleUrls: ['./clasificaciones.css'], // corregido
})
export class Clasificaciones implements OnInit {

  protected partido: Ipartido[] = [];
  protected loading: boolean = true;
  protected error: string | null = null;

  constructor(
    private authService: AuthService,
    private verPartido: VerPartido,
    private cdr: ChangeDetectorRef

  ) {}


ngOnInit() {
  console.log('Iniciando carga de partidos...');

  const user = this.authService.getCurrentUserid(); // objeto User o undefined
  console.log('Usuario actual:', user);

  this.cargarPartidos(user);
}


 private cargarPartidos(user?: any) {

this.verPartido.getPartidos().subscribe({
  next: (data: Ipartido[]) => {
    console.log('Partido cargado:', data);
    this.partido = data; // ✅ deja que el backend filtre por rol
    console.log('Partidos finales a mostrar:', this.partido);
    this.loading = false;
  },
  error: (err) => {
    console.error('Error cargando partidos:', err);
    this.error = 'No se pudieron cargar los partidos';
    this.loading = false;
  }
});

}


}
