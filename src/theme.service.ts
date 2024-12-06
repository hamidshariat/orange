import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);  // Apply saved theme during initialization
  }

  // Set the theme and update the document's data-theme attribute
  setTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  // Toggle between light and dark themes
  toggleTheme(): void {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
