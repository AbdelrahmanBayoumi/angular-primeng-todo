import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { Theme, ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, DropdownModule],
  templateUrl: './app.component.html',
  styles: [``],
})
export class AppComponent {
  themes: Theme[];
  selectedTheme: Theme;

  constructor(public themeService: ThemeService) {
    this.themes = this.themeService.getThemeList();
    this.selectedTheme = this.themeService.selectedTheme;
  }

  changeTheme(theme: Theme) {
    this.themeService.switchTheme(theme);
  }
}
