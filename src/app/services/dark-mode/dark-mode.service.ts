import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  isActive: boolean = false;
  cssClass: string = "dark-mode";

  onToggleDarkMode() {
    this.isActive = !this.isActive;
  }
}
