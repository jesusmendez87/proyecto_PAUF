import { Equipos } from "../../pages/equipos/equipos";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Iequipo } from "../models/equipos.model";

@Injectable({
  providedIn: 'root', })
export class VerEquipo {
    private apiUrl = 'http://localhost:3000/api/equipos';

    constructor(private http: HttpClient) {}
 
  getEquipos(): Observable<Iequipo[]> {
    return this.http.get<Iequipo[]>(this.apiUrl);
  }

}