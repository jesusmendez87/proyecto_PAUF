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
  
  getPartidos(): Observable<Ipartido[]> {
    return this.http.get<Ipartido[]>(this.apiUrl);
  }

}
