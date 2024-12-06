import {Component, inject} from '@angular/core';
import { DrawComponent } from '../draw/draw.component';
import { TexteditorComponent } from '../texteditor/texteditor.component';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [DrawComponent,RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orange';

}
