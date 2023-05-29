import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private result$ = new Subject<any>();
  private restart$ = new Subject<any>();
  private playerTurn$ = new Subject<boolean>();
  private isPlayerOneTurn:boolean = true;
  restart = this.restart$.asObservable();
  result = this.result$.asObservable();
  playerTurn = this.playerTurn$.asObservable();

  constructor() { 
    this.playerTurn$.next(true)
  }

  getCurrentPlayer():number {
    return this.isPlayerOneTurn ? 1 : 2;
  }

  turnFinished() {
    this.isPlayerOneTurn = !this.isPlayerOneTurn;
    this.playerTurn$.next(this.isPlayerOneTurn)
  }

  gameWon(player: any) {
    this.result$.next(player);
  }

  gameRestarted(){
    this.restart$.next(true);
  }
}
