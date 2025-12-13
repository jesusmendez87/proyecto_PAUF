import { Identifier } from './../../../../node_modules/@babel/types/lib/index-legacy.d';
import { Ipartido } from './../../core/models/partidos.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';
import { VerPartido } from '../../core/services/verPartido';

import { LoginComponent } from '../../shared/components/login/login';


@Component({
  selector: 'app-clasificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clasificaciones.html',
  styleUrl: './clasificaciones.css',
})
export class Clasificaciones implements OnInit {
 
  protected partido: Ipartido | null = null;
  protected loading: boolean = true;
  protected error: string | null = null;

  constructor(
    private authService: AuthService,
    private verPartido: VerPartido
  ) {}
  
  ngOnInit() {
    console.log('Iniciando carga de partidos...');
  // mostrar clasificaciones

  const stringId =  this.partido?.arbitro_id.toString();
  
  if(
  (stringId && this.authService.getCurrentUserid() === stringId) ||
  this.authService.hasRole("admin")
) {


  
    this.verPartido.getCurrentPartido().subscribe({
      next: (data) => {
        console.log('Partido cargado:', data);
        this.partido = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar:', err);
        this.error = `Error: ${err.message || err.status} - Verifica que la API está corriendo`;
        this.loading = false;
      }
    });
    }
  }
}
