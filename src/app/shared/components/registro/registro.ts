import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Register } from '../../../core/register'; 


@Component({
  selector: 'app-registro',
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {

  username: string = '';  
  password: string = '';
  name: string = '';
  confirmPassword: string = '';
  rol: string = '';

  loading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor( private registerService: Register, private router: Router) {}

  register() {
    //verificamos la parametrización de todas las variables
    if (!this.username || !this.name || !this.password || !this.confirmPassword || !this.rol) {
      this.errorMessage = 'Rellena todos los campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;


    //enviamos los datos al servidor
    this.registerService.register(this.username, this.password, this.name, this.rol).subscribe({
      next: (res) => {
        this.successMessage = res?.message || 'Registro exitoso';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || err?.message || 'Error en el registro';
        this.loading = false;
      }
    });
  }
}