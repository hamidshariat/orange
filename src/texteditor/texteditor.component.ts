import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  imports: [QuillModule,FormsModule],
  styleUrls: ['./texteditor.component.css']
})
export class TexteditorComponent {

  @ViewChild('editor', { static: false }) editor: ElementRef | undefined;

  isToolbarVisible = false; // State for toolbar visibility

  constructor(private renderer: Renderer2) {}

  toggleToolbar() {
    this.isToolbarVisible = !this.isToolbarVisible;
  // Add or remove 'small' class from the menu button
  const menuButton = document.querySelector('.menu-button');
  if (!this.isToolbarVisible) {
    menuButton?.classList.add('small');
  } else {
    menuButton?.classList.remove('small');
  }
  }



  toggleCommand(command: string, button: HTMLButtonElement) {
    document.execCommand(command);
    const isActive = document.queryCommandState(command);

    if (isActive) {
      this.renderer.addClass(button, 'active');
    } else {
      this.renderer.removeClass(button, 'active');
    }
  }

  // Apply bold formatting
  applyBold() {
    document.execCommand('bold');

  }

  // Apply italic formatting
  applyItalic() {
    document.execCommand('italic');
  }

  // Apply underline formatting
  applyUnderline() {
    document.execCommand('underline');
  }

  // Apply strike-through formatting
  applyStrike() {
    document.execCommand('strikeThrough');
  }

  // Insert a hyperlink
  applyLink() {
    const url = prompt('Enter the link URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  }

  // Insert an image
  applyImage() {
    const url = prompt('Enter the image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
    }
  }

  // Change text color
  applyTextColor(event: any) {
    const color = event.target.value;
    document.execCommand('foreColor', false, color);
  }

  // Change background color of the selected text
  applyBackgroundColor(event: any) {
    const color = event.target.value;
    document.execCommand('hiliteColor', false, color);
  }
  
}
