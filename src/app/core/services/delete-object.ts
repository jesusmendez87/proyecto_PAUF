import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DeleteService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  delete(type: string, id: string) {
    const token = localStorage.getItem('token');  
    return this.http.delete(`${this.apiUrl}/delete/${type}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}