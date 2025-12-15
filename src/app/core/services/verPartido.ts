import { Ipartido } from '../models/partidos.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';


export interface partido {
  arbitro_id: string;
  deporte: string;
  local_id: string;
  visitante_id: string;
}
 export interface IActaEvento {
  jugador: string;   // nombre del jugador
  minuto: number;    // minuto del evento
  tipo: 'gol' | 'amarilla' | 'roja' | 'cambio' | string;
}

@Injectable({
  providedIn: 'root',
})
export class VerPartido {
    private apiUrl = 'http://localhost:3000/api/partidos';

    constructor(private http: HttpClient) {}

  getCurrentPartido(): Observable<Ipartido> {
    return this.http.get<Ipartido[]>(`${this.apiUrl}`).pipe(
      map(partidos => partidos[0])
    );
  }


  getActas(): Observable<Ipartido> {
     const token = localStorage.getItem('token');
  return this.http.get<Ipartido[]>(this.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).pipe(
    map(partidos => partidos[0])
  );
  }


  getPartidos(): Observable<Ipartido[]> {
const token = localStorage.getItem('token'); // JWT
  return this.http.get<Ipartido[]>(this.apiUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
}
