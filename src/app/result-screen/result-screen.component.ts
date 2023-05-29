import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../game.service';

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.scss']
})
export class ResultScreenComponent implements OnInit {
  winner:number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.restart.subscribe((r) => {
      if (r == true) { this.activeModal.close() }
    })
    this.winner = this.gameService.getCurrentPlayer()
  }

  restart() {
    this.gameService.gameRestarted()
  }

}
