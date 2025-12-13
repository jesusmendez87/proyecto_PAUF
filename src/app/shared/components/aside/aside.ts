import { Component } from '@angular/core';
import { HasRoleDirective } from "../../../core/services/role.guard";
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [HasRoleDirective,RouterModule],
  standalone: true,
  templateUrl: './aside.html',
  styleUrl: './aside.css',
}) 
export class Aside {

}
