import { Component } from '@angular/core';
import { DarkModeService } from './services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookshelf-client';
   constructor(public darkMode: DarkModeService) {}
}
