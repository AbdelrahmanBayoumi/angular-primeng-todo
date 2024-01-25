import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export interface Theme {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _themeList: Theme[] = [
    { name: 'saga-blue', image: 'assets/images/themes/saga-blue.png' },
    { name: 'vela-blue', image: 'assets/images/themes/vela-blue.png' },
    { name: 'arya-blue', image: 'assets/images/themes/arya-blue.png' },
    {
      name: 'md-light-indigo',
      image: 'assets/images/themes/md-light-indigo.svg',
    },
    {
      name: 'md-dark-indigo',
      image: 'assets/images/themes/md-dark-indigo.svg',
    },
    {
      name: 'bootstrap4-light-purple',
      image: 'assets/images/themes/bootstrap4-light-purple.svg',
    },
    {
      name: 'bootstrap4-dark-purple',
      image: 'assets/images/themes/bootstrap4-dark-purple.svg',
    },
  ];

  public selectedTheme: Theme;

  constructor(@Inject(DOCUMENT) private document: Document) {
    let theme = localStorage.getItem('theme');

    if (theme) {
      this.selectedTheme = JSON.parse(theme);
    } else {
      this.selectedTheme = this._themeList[0];
    }

    // switch theme if it is not the default one
    this.switchTheme(this.selectedTheme);
  }

  getThemeList(): Theme[] {
    return this._themeList;
  }

  switchTheme(theme: Theme) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme.name + '.css';
    }

    console.log(themeLink);

    this.selectedTheme = theme;

    // save to local storage
    localStorage.setItem('theme', JSON.stringify(theme));
  }
}
