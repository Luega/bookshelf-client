import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard = () => {
  return async () => {
    const router: Router = inject(Router);
    const isAuth = false;
    
    isAuth ? true : router.navigate(['login']); 
  }
}
