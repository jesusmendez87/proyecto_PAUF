import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Subscription } from 'rxjs';

@Directive({ selector: '[hasRole]' })
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

  ngOnDestroy() { this.sub.unsubscribe(); }
}