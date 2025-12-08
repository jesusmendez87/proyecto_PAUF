
import { Component } from '@angular/core';
import { Noticias } from './../../shared/components/noticias/noticias';
import { Shared } from './../../shared/shared';

@Component({
  selector: 'app-homepage',
  imports: [Noticias, Shared],
  standalone: true,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {

}
