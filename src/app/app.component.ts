import {Component, inject} from '@angular/core';
import { DrawComponent } from '../draw/draw.component';

@Component({
  selector: 'app-root',
  imports: [DrawComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orange';

}
