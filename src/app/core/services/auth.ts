import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface User {
  _id: string;
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
      const userRaw = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');
      if (!userRaw || !token) return null;
      return JSON.parse(userRaw) as User;
    } catch {
      return null;
    }
  })()
);


  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

login(username: string, password: string): Observable<any> {
  return new Observable(observer => {
    this.http.post<{ user: User, token: string }>(this.apiUrl, { username, password })
      .subscribe({
        next: (res) => {
          // Guardamos user y token
          this.setCurrentUser(res.user, res.token);

          // Actualizamos BehaviorSubject
          this.currentUserSubject.next(res.user);

          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
  });
}


setCurrentUser(user: User | null, token?: string) {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}


  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

    getCurrentUserid(): string | null {
    return this.getCurrentUser()?._id ?? null;
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
