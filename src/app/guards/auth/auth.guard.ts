import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

export const authGuard = () => {
  return () => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    authService.isAuth() ? true : router.navigate(['login']); 
  }
}
