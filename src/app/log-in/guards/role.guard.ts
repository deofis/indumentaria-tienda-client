import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }

      let role = route.data['role'] as string;
      let admin = 'ROLE_ADMIN';

      if (this.authService.hasRole(role)) {
        return true;
      }

      // Si el admin intenta acceder a un recurso de usuario, lo redirige a admin profile (Para evitar errores).
      if(this.authService.hasRole(admin) && role !== admin) {
        this.router.navigate(['/admin-profile']);
        return false;
      }

      alert('No tenés acceso a este recurso');
      this.router.navigate(['/home']);
      return false;
  }
  
}
