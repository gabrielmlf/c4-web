import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultScreenComponent } from './result-screen/result-screen.component';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'connect4';
  restartGame = false;
  options = { backdrop: 'static', focus: true, keyboard: false }

  constructor(
    private modalService: NgbModal,
    private gameService: GameService
  ) { }


  ngOnInit(): void {
   this.gameService.result.subscribe((player)=>{
    console.log(`%cPlayer ${player} Wins`, 'color:green');
    this.victoryModal()
   })
  }

  victoryModal() {
    this.modalService.open(ResultScreenComponent);
  }
}
