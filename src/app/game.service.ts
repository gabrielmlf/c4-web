import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private result$ = new Subject<any>();
  private restart$ = new Subject<any>();
  private newTurn$ = new Subject<boolean>();
  private isPlayerOneTurn:boolean = true;
  restart = this.restart$.asObservable();
  result = this.result$.asObservable();
  newTurn = this.newTurn$.asObservable();

  constructor() { 
    this.newTurn$.next(true)
  }

  getCurrentPlayer():number {
    return this.isPlayerOneTurn ? 1 : 2;
  }

  turnFinished() {
    this.isPlayerOneTurn = !this.isPlayerOneTurn;
    this.newTurn$.next(this.isPlayerOneTurn)
  }

  gameWon(player: any) {
    this.result$.next(player);
  }

  gameRestarted(){
    this.isPlayerOneTurn = true
    this.newTurn$.next(true)
    this.restart$.next(true);
  }
}
