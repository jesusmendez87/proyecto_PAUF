import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from '../models/user.model';



@Injectable({
  providedIn: 'root'
})


export class userService  {

  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsersByRole(rol: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}?rol=${rol}`);
  }
  getUsuarioName(name: Object): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${name}`);
  }
}
