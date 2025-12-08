import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface User {
  _id?: string;
  username: string;
  name?: string;
  rol?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';

  private currentUserSubject = new BehaviorSubject<User | null>(
    (() => {
      try {
        const raw = localStorage.getItem('currentUser');
        return raw ? (JSON.parse(raw) as User) : null;
      } catch {
        return null;
      }
    })()
  );

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password});
  }

  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
    try {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    } catch {
      // ignore localStorage errors
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  logout() {
    this.setCurrentUser(null);
  }

  hasRole(roleOrRoles: string | string[]): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.rol) return false;
    const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
    return roles.includes(user.rol);
  }
}