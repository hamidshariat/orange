import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawComponent } from '../draw/draw.component';
import { TexteditorComponent } from '../texteditor/texteditor.component';


@Component({
  selector: 'app-root',
  imports: [DrawComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orange';
}
