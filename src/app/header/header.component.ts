import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isPlayer1Turn:boolean = true

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.newTurn.subscribe(()=>{
      this.isPlayer1Turn = this.gameService.getCurrentPlayer() == 1;
    })
  }

  restart() {
    this.gameService.gameRestarted();
  } 
}
