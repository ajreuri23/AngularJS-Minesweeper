import { Board } from './board';
import { Cube } from '../cube/cube';
import { mineSweeperService } from '../../services/gameService';

class boardController implements ng.IComponentController {
    public board: Board;
    public boardSize: number;
    public size: any;
    
    constructor() {
        this.boardSize = this.size;
    }

    $doCheck() {
        if (this.boardSize !== this.size) {
            this.boardSize = this.size;
            this.startGame();
        }
    }

    startGame() {
        this.board = new Board(this.size);
        this.board = mineSweeperService.initializeBoard(this.board);
    }

    $onInit() {
        this.startGame();
    }

    openCube(cube: Cube, board: Board, index: number) {
        mineSweeperService.openCube(cube, board, index);
    }

    setFlag(cube: Cube, board: Board, index: number) {
        if (cube.setFlag()) {
            if (cube.getState() === "flag") {
                this.board.flaggedCube();
                if (this.checkIfFlaggedMine(cube)) {
                    this.board.flaggedMine();
                    if (this.board.getMinesLeft() === 0) {
                        mineSweeperService.endGame(this.board, true);
                    }
                }
            } else {
                this.board.unflaggedCube();
                if (this.checkIfFlaggedMine(cube)) {
                    this.board.unflaggedMine();
                }
            }
        }


    }

    checkIfFlaggedMine(cube: Cube) {
        if (cube.isBomb()) {
            return true;
        }
        return false;
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