import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  restart() {
    this.gameService.gameRestarted();
  } 
}
