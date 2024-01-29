import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isAuth: boolean = false;

   constructor(
    private authService: AuthService,
    private router: Router,
    public darkMode: DarkModeService
    ) {}

    ngOnInit(): void {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isAuth = this.authService.isAuth();
        }
      });
    }

   togleMenu() {
      setTimeout(() => {
        this.isMenuOpen = !this.isMenuOpen;    
      }, 10)
    }

   logOut() {
      this.authService.logOut();
      this.router.navigate(['login']);
   };
}
