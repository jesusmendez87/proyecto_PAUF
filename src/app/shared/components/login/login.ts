import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

import {RouterLink} from '@angular/router';

@Component({  
  selector: 'app-login',
  standalone: true,
 
  imports: [FormsModule, CommonModule, RouterLink],


  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  loading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

 login() {
  if (!this.username || !this.password) {
    this.errorMessage = 'Rellena usuario y contraseña';
    return;
  }

  this.loading = true;
  this.errorMessage = null;
  this.successMessage = null;

  console.log('Intentando login con:', this.username, this.password);
  this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      console.log('Login exitoso', res);
      this.successMessage = res?.message || 'Login exitoso';
      // set current user in service so guard and other components can read it
      if (res && res.user) {
        this.authService.setCurrentUser(res.user);
      }
      this.loading = false;
      // navigate after successful login
      setTimeout(() => this.router.navigate(['/']), 500);
    },
    error: (err) => {
      console.error('Error en login', err);
      // Preferir mensaje del servidor si existe
      this.errorMessage = err?.error?.message || err?.message || 'Error en login';
      this.loading = false;
    }
  });
  }

}