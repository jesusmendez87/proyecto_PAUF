import { Arbitros } from './pages/arbitros/arbitros';
import { Equipos } from './pages/equipos/equipos';
import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Noticias } from './shared/components/noticias/noticias';
import { Contacto } from './pages/contacto/contacto';
import { Jugadores } from './pages/jugadores/jugadores';
import { Clasificaciones } from './pages/clasificaciones/clasificaciones';
import { LoginComponent } from './shared/components/login/login';
import { Registro } from './shared/components/registro/registro';
import { RoleGuard } from './shared/directives';
import { App } from './app';


export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: LoginComponent },   
  { path: 'arbitros', component: Arbitros, canActivate: [RoleGuard], data: { roles: ['admin', 'arbitro'] } },
  { path: 'equipos', component: Equipos, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador'] } },
  { path: 'jugadores', component: Jugadores, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador'] } },
  { path: 'clasificaciones', component: Clasificaciones, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador', 'arbitro'] } },
  { path: 'noticias', component: Noticias, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador', 'arbitro'] } },
  { path: 'contacto', component: Contacto, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador', 'arbitro'] } },
  { path: 'registro', component: Registro },
  { path: '**', redirectTo: '' }
];
