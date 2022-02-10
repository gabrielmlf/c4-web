import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'connect4';
  restartGame = new EventEmitter();

  restart() {
    this.restartGame.emit(true);
  }
}
