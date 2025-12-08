import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/services/auth';
import { Subscription } from 'rxjs';

// RoleGuard: protege rutas según rol
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.isLoggedIn()) {
      return this.router.parseUrl('/login');
    }
    const allowed: string[] | undefined = route.data?.['roles'];
    if (!allowed || allowed.length === 0) {
      return true; // ruta pública para usuarios logueados
    }
    if (this.auth.hasRole(allowed)) {
      return true;
    }
    // redirect a homepage si no tiene rol permitido
    return this.router.parseUrl('/');
  }
}

// HasRoleDirective: muestra/oculta elementos según rol (*hasRole="'admin'")
@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective implements OnDestroy {
  private sub: Subscription;
  private allowedRoles: string[] = [];

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private auth: AuthService
  ) {
    this.sub = this.auth.currentUser$.subscribe(() => this.update());
  }

  @Input('hasRole') set hasRoleInput(val: string | string[]) {
    this.allowedRoles = Array.isArray(val) ? val : [val];
    this.update();
  }

  private update() {
    const show = this.auth.hasRole(this.allowedRoles);
    this.vcr.clear();
    if (show) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}