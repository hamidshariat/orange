import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbar,
    MatIconModule,
    MatButtonModule,
     MatMenuModule,

  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private themeService = inject(ThemeService);

  @Output() undoAction = new EventEmitter<void>();
  @Output() redoAction = new EventEmitter<void>();
  @Output() ctx = new EventEmitter<void>();


  undoLast() {
    this.undoAction.emit()
  }
  redoLast() {
    this.redoAction.emit()
  }
  clearCanvas(){
    this.ctx.emit()
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
