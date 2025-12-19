
import { Component } from '@angular/core';
import { Noticias } from './../../shared/components/noticias/noticias';
import { Aside } from "../../shared/components/aside/aside";
 import { HasRoleDirective } from '../../shared/directives';
 import { RouterLink } from '@angular/router';
 

@Component({
  selector: 'app-homepage',
 standalone: true,
  imports: [Noticias, Aside,RouterLink],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
 
}
