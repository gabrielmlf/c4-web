import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private result$ = new Subject<any>();
  private restart$ = new Subject<any>();
  restart = this.restart$.asObservable();
  result = this.result$.asObservable();
  constructor() { }

  gameWon(player: any) {
    this.result$.next(player);
  }

  gameRestarted(){
    this.restart$.next(true);
  }
}
