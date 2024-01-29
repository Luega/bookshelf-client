import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  isMenuOpen: boolean = false;

   constructor(public darkMode: DarkModeService) {}

   togleMenu() {
    setTimeout(() => {
      this.isMenuOpen = !this.isMenuOpen;    
    }, 10);
   }
}
