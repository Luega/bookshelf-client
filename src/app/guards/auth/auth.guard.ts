import { Router } from "@angular/router";

export const authGuard = () => {
  return async (router: Router) => {
    const isAuth = true;
    isAuth ? true : router.navigate(['login']); 
  }
}
