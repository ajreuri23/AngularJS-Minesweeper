import { Board } from './board';
import { Cube } from '../cube/cube';
import {gameService} from '../../services/gameService';

class boardController implements ng.IComponentController {
    public board: Board;
    public size: any;

    constructor() {
    }

    getSize() {
        return new Array(this.size);
    }

    $onChanges() {
        this.startGame();
    }

    startGame() {
        this.board = gameService.initializeBoard(this.size);
    }

    $onInit() {
        this.startGame();
    }

    openCube(row: number, column: number) {
        gameService.openCube(this.board.getCells()[row][column], this.board, row, column);
    }

    setFlag(row: number, column: number) {
        let cube = this.board.getCells()[row][column];

        if (!cube.setFlag()) return;

        if (cube.isFlag()) { 
            this.flagCube(cube); 
        } else {
            this.unflagCube(cube);
        }
    }

    flagCube(cube: Cube) {
        this.board.decreaseFlaggedCubesAmount();
        if (cube.isBomb()) {
            this.board.decreaseMinesLeftAmount();
            if (this.board.getMinesLeft() === 0) {
                gameService.endGame(this.board, true);
            }
        }
    }

    unflagCube(cube: Cube) {
        this.board.increaseFlaggedCubesAmount();
        if (cube.isBomb()) {
            this.board.increaseMinesLeftAmount();
        }
    }
}

export class boardComponent implements ng.IComponentOptions {
    public controller: any;
    public templateUrl: string;
    public bindings: any;

    public constructor() {
        this.templateUrl = '../src/components/board/board.component.html';
        this.controller = boardController;
        this.bindings = {
            size: '<'
        }
    }
}