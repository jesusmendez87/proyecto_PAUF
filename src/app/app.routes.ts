import { Arbitros } from './pages/arbitros/arbitros';
import { Equipos } from './pages/equipos/equipos';
import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Noticias } from './shared/components/noticias/noticias';
import { Contacto } from './pages/contacto/contacto';
import { Jugadores } from './pages/jugadores/jugadores';
import { Resultados } from './pages/resultados/resultados';
import { LoginComponent } from './shared/components/login/login';
import { Registro } from './shared/components/registro/registro';
import { RoleGuard } from './shared/directives';
import { Competiciones } from './pages/competiciones/competiciones';
import { Delete } from './pages/delete/delete';

// habilitamos las rutas según roles
export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: LoginComponent },
  { path: 'arbitros', component: Arbitros, canActivate: [RoleGuard], data: { roles: ['admin', 'arbitro'] } },
  { path: 'equipos', component: Equipos, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador'] } },
  { path: 'jugadores', component: Jugadores, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador'] } },
  { path: 'clasificaciones', component: Resultados, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador', 'arbitro'] } },
  { path: 'noticias', component: Noticias, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador', 'arbitro'] } },
  { path: 'contacto', component: Contacto, canActivate: [RoleGuard], data: { roles: ['admin', 'jugador', 'arbitro'] } },
  { path: 'competiciones', component: Competiciones, canActivate: [RoleGuard], data: { roles: ['admin'] } },
    { path: 'delete', component: Delete, canActivate: [RoleGuard], data: { roles: ['admin'] } },
  { path: 'registro', component: Registro },
  { path: '**', redirectTo: '' },

];
