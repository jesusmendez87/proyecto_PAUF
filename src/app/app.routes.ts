import { Arbitros } from './pages/arbitros/arbitros';
import { Equipos } from './pages/equipos/equipos';
import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Noticias } from './shared/components/noticias/noticias';
import { Contacto } from './pages/contacto/contacto';
import { Jugadores } from './pages/jugadores/jugadores';
import { Clasificaciones } from './pages/clasificaciones/clasificaciones';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'arbitros', component: Arbitros },
  { path: 'equipos', component: Equipos },
  { path: 'jugadores', component: Jugadores },
  { path: 'clasificaciones', component: Clasificaciones },
  { path: 'noticias', component: Noticias },
  { path: 'contacto', component: Contacto },
];
