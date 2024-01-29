import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  isActive: boolean = false;
  cssClass: string = "dark-mode";

  onToggleDarkMode() {
    this.isActive = !this.isActive;
    localStorage.setItem('isDarkMode', this.isActive.toString());
  }

  checkLocalStorage() {
    const dataInLocalStorage = localStorage.getItem('isDarkMode');
    if (dataInLocalStorage) {
      dataInLocalStorage == 'true' ? this.isActive = true : this.isActive = false;
    }
  }
}
