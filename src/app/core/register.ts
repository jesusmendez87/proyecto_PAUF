import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Register {
  private apiUrl = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, name: string, rol: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password, name, rol });
  } 

}
