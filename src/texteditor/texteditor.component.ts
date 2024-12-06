import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  imports: [ FormsModule, MatIconModule],
  standalone: true,
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent {

  @ViewChild('editor', { static: false }) editor: ElementRef | undefined;

  isToolbarVisible = false; // State for toolbar visibility

  constructor(private renderer: Renderer2) {}

  toggleToolbar() {
    this.isToolbarVisible = !this.isToolbarVisible;

  }

  toggleCommand(command: string, button: HTMLButtonElement) {
    document.execCommand(command);
    const isActive = document.queryCommandState(command);

    if (isActive) {
      this.renderer.addClass(button, 'active');
      this.renderer.addClass(button, 'selected');
    } else {
      this.renderer.removeClass(button, 'active');
      this.renderer.removeClass(button, 'selected');
    }
  }

  applyLink() {
    const url = prompt('Enter the link URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  }

  applyImage() {
    const url = prompt('Enter the image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
    }
  }

  applyTextColor(event: any) {
    const color = event.target.value;
    document.execCommand('foreColor', false, color);
  }

  applyBackgroundColor(event: any) {
    const color = event.target.value;
    document.execCommand('hiliteColor', false, color);
  }
}
