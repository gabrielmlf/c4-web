import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { GameRowsCols } from '../static-settings/rows-and-cols';
import { animate, style, transition, trigger } from '@angular/animations';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GameService } from '../game.service';

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
          height: "10vh",
          width:"10vh",
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
  @Output() gameWon = new EventEmitter<number>();
  rowsCols = GameRowsCols;
  board!: any[][];
  finishedLoading: boolean = false;
  isPlayerTurn: boolean = true;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.createGameArray(this.rowsCols.cols.length)
      .then((game: any) => (this.board = game))
      .finally(() => (this.finishedLoading = true));
    this.gameService.restart.subscribe((r) => {
      this.onReset()
    })
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
    if (freeRow < 0) return
    this.board[parseInt(col)][freeRow] = this.gameService.getCurrentPlayer();
    if (this.hasWinningMove(parseInt(col), freeRow)) {
      this.gameFinished();
    }
    this.gameService.turnFinished();
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

  gameFinished() {
    const player = this.isPlayerTurn ? 2 : 1;
    this.gameService.gameWon(player);
  }

  //🤖This part of the code was made using Chat-GPT🤖
  hasWinningMove(col: number, row: number) {
    const board = this.board;
    const player = board[col][row];
    // Check horizontal
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][row] === player) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    // Check vertical
    count = 0;
    for (let j = 0; j < board[row].length; j++) {
      if (board[col][j] === player) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    // Check diagonal (top-left to bottom-right)
    count = 0;
    let i = col;
    let j = row;
    while (i > 0 && j > 0) {
      i--;
      j--;
    }
    while (i < board.length && j < board[row].length) {
      if (board[i][j] === player) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
      i++;
      j++;
    }

    // Check diagonal (bottom-left to top-right)
    count = 0;
    i = col;
    j = row;
    while (i > 0 && j < board[row].length - 1) {
      i--;
      j++;
    }
    while (i < board.length && j >= 0) {
      if (board[i][j] === player) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
      i++;
      j--;
    }

    // No winning move found
    return false;
  }

}
