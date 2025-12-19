import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({ 
  providedIn: 'root',
})
export class NuevoPartido {
  private apiUrl = 'http://localhost:3000/api/partido';

  constructor(private http: HttpClient) {}
  //método para crear nuevos partidos con los pámetros necesarios haciendo post a la bbdd
  nuevoPartido(local_id: string, visitante_id: string, arbitro_id: string, lugar: string, fecha: Date, deporte: string): Observable<any> {
    return this.http.post(this.apiUrl, { local_id, visitante_id, arbitro_id, lugar, fecha, deporte });
  }
  
}
