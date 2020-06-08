import { Board } from './board';
import { Cube } from '../cube/cube';
import { mineSweeperService } from '../../services/gameService';
import {sizeToMines} from '../../models/sizeToMines';

class boardController implements ng.IComponentController {
    public board: Board;
    public boardSize: number;

    static $inject: string[] = ["$element"];

    constructor(private size: any) {
        this.boardSize = size;
    }

    $doCheck() {
        if (this.boardSize !== this.size) {
            this.boardSize = this.size;
            this.startGame();
        }
    }

    startGame() {
        this.board = new Board(this.size, sizeToMines.get(this.size.toString()));
        this.board = mineSweeperService.initializeBoard(this.board);
    }

    $onInit() {
        this.startGame();
    }

    openCube(cube: Cube, board: Board, index: number) {
        cube = mineSweeperService.openCube(cube, board, index);
        this.board.assignCubeInPosition(cube, Math.floor(index / this.board.getBoardSize()), index % this.board.getBoardSize());
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