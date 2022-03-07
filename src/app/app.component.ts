import { Component } from '@angular/core';

interface line {
  order: number,
  state: boolean,
  setBy: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'totito';
  lines = [
    [
      { order: 1, state: false, setBy: ""},
      { order: 2, state: false, setBy: "" },
      { order: 3, state: false, setBy: "" },
    ],
    [
      { order: 4, state: false, setBy: "" },
      { order: 5, state: false, setBy: "" },
      { order: 6, state: false, setBy: "" },
    ],
    [
      { order: 7, state: false, setBy: "" },
      { order: 8, state: false, setBy: "" },
      { order: 9, state: false, setBy: "" },
    ],
  ];
  movimientosGanadores = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,8,9],
    [1,5,9],
    [3,5,7],
  ];
  movimientoActual:Array<number> = [];
  movimientos = [[1, 2, 3]];
  someOneWin = false;
  constructor() {}

  clickRow(element: line) {
    console.log('row', element);
    if(!element.state) {
      this.movimientoActual.push(element.order);
      element.state = true;
      element.setBy = "user";
      const isWinNow = this.isWin();
      if(isWinNow) {
        console.log("Wiiiiiin");
        this.movimientos.push(this.movimientoActual);
        this.movimientoActual = [];
        this.someOneWin = true;
        this.nextGame();
      } else {
        const nextMoveIa = this.foundNextIaMovement();
        if(nextMoveIa) {
          this.setIaMovement(nextMoveIa);
        } else {
          this.randomIaMovement();
        }
      }
    }
  }

  isWin() {
    const acutalMovement = this.movimientoActual.sort((a,b)=>a-b);
    let win = false;
    for(let i = 0; i < this.movimientosGanadores.length; i++ ) {
      if(this.arraysEqual(acutalMovement,this.movimientosGanadores[i])) {
        win = true;
      }
    }
    return win;
  }

  arraysEqual(a:any, b:any) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  setIaMovement(movement: number) {
    for(let i = 0; i < this.lines.length; i++) {
      let foundMove = false;
      for(let x = 0; x < this.lines[i].length; x++) {
        if( movement ===  this.lines[i][x].order) {
          this.lines[i][x].state = true;
          this.lines[i][x].setBy = "ia";
          foundMove = true;
          break;
        }
      }
      if(foundMove) {
        break;
      }
    }
  }

  randomIaMovement() {
    for(let i = 0; i < this.lines.length; i++) {
      let foundMove = false;
      for(let x = 0; x < this.lines[i].length; x++) {
        if(!this.lines[i][x].state) {
          this.lines[i][x].state = true;
          this.lines[i][x].setBy = "ia";
          foundMove = true;
          break;
        }
      }
      if(foundMove) {
        break;
      }
    }
  }

  foundNextIaMovement():any {
    const acutalMovement = this.movimientoActual.sort((a,b)=>a-b);
    let foundMovementIa = null;
    for(let x = 0; x < acutalMovement.length; x++) {
      for(let i = 0; i < this.movimientos.length; i ++) {
        if(acutalMovement[x] === this.movimientos[i][x]) {
          if(this.movimientos[i][x + 1]) {
            foundMovementIa = this.movimientos[i][x + 1];
          }
        }
      }
    }
    return foundMovementIa;
  }

  nextGame() {
    this.lines = [
      [
        { order: 1, state: false, setBy: ""},
        { order: 2, state: false, setBy: "" },
        { order: 3, state: false, setBy: "" },
      ],
      [
        { order: 4, state: false, setBy: "" },
        { order: 5, state: false, setBy: "" },
        { order: 6, state: false, setBy: "" },
      ],
      [
        { order: 7, state: false, setBy: "" },
        { order: 8, state: false, setBy: "" },
        { order: 9, state: false, setBy: "" },
      ],
    ];
  }
}
