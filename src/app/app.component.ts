import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawComponent } from '../draw/draw.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DrawComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orange';
}
