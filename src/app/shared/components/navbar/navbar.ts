import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HasRoleDirective } from '../../directives';
import { AuthService } from '../../../core/services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, HasRoleDirective, NgIf],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
