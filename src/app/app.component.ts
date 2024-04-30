import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterHandlerComponent } from './counter-handler/counter-handler.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CounterHandlerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'counterAppAngular';
}
