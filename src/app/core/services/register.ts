import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
// servicio para registrar usuarios
export class Register {
  private apiUrl = environment.apiUrl + '/register';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, name: string, rol: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password, name, rol });
  }

}
