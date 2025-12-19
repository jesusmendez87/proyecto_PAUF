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
  //método para obtener rol de usuario
  getUsersByRole(rol: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}?rol=${rol}`);
  }
   //método para obtener nombre del usuario
  getUsuarioName(name: Object): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${name}`);
  }

   //método para obtener id del usuario
  getUsuarioId(_id: Object): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${_id}`);
  }
}


