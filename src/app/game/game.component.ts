import { Component, Input, OnInit } from '@angular/core';
import { GameRowsCols } from '../static-settings/rows-and-cols';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('discInsertedAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          marginBottom: '1300px',
          position: 'absolute',
        }),
        animate(
          '0.5s cubic-bezier(0.33333, 0, 0.66667, 0.33333)',
          style({ marginBottom: '0px', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class GameComponent implements OnInit {
  @Input() restartGame: any;
  rowsCols = GameRowsCols;
  board!: any[][];
  finishedLoading: boolean = false;
  userTurn = true;

  constructor() {}

  ngOnInit(): void {
    this.createGameArray(this.rowsCols.cols.length)
      .then((game: any) => (this.board = game))
      .finally(() => (this.finishedLoading = true));
  }

  createGameArray(cols: number) {
    return new Promise((resolve) => {
      let game = [];
      for (let i = 0; i < cols; i++) {
        game[i] = [0, 0, 0, 0, 0, 0];
      }
      resolve(game);
    });
  }

  rowClicked(e: MouseEvent) {
    e.stopPropagation();
    const object = e.currentTarget! as HTMLDivElement;
    const [row, col] = object.id.split(' ');
    this.insertDisc(col);
  }

  insertDisc(col: string) {
    const freeRow = this.board[parseInt(col)].lastIndexOf(0);
    if (freeRow !== -1) {
      this.board[parseInt(col)][freeRow] = this.userTurn ? 1 : 2;
      this.userTurn = !this.userTurn;
    } else console.log('%cno free space!', 'color:red');
  }

  userFilledCell(row: string, col: string) {
    if (this.board[parseInt(col)][parseInt(row)] == 1) return true;
    else return false;
  }

  opponentFilledCell(row: string, col: string) {
    if (this.board[parseInt(col)][parseInt(row)] == 2) return true;
    else return false;
  }

  onReset() {
    this.createGameArray(this.rowsCols.cols.length).then(
      (game: any) => (this.board = game)
    );
  }
}
