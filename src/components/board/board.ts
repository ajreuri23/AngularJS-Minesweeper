import {Cube} from '../cube/cube';
import {sizeToMines} from '../../models/sizeToMines';
import {gameStates} from '../../models/gameStates';

export class Board {
    private cells: Cube[][];
    private boardSize: number;
    private amountOfMines: number;
    private minesLeft: number;
    private flaggedCells: number;
    private openedCells: number;
    private gameState: gameStates;

    constructor(size: number) {
        this.cells = [];
        this.boardSize = size;
        this.amountOfMines = sizeToMines.get(size.toString());
        this.minesLeft = this.amountOfMines;
        this.flaggedCells = this.amountOfMines;
        this.openedCells = 0;
        this.gameState =gameStates.Running;

        this.initializeCells();        
    }

    initializeCells() {
        for(let row = 0; row < this.boardSize; row++) {
            this.cells[row] = [];
            for(let column = 0; column < this.boardSize; column++) {
                this.cells[row][column] = new Cube("facingDown"); 
            }
        }
    }

    getGameState() {
        return this.gameState;
    }

    getAmountOfMines() {
        return this.amountOfMines;
    }

    isGameEnded() {
        return this.gameState !== gameStates.Running;
    }

    endGame(state: gameStates) {
        this.gameState = state;
    }

    getOpenedCubes() {
        return this.openedCells;
    }

    getFlaggedCubes() {
        return this.flaggedCells;
    }

    openedCube() {
        this.openedCells++;
    }

    flaggedCube() {
        this.flaggedCells--;
    }

    unflaggedCube() {
        this.flaggedCells++;
    }

    flaggedMine() {
        this.minesLeft--;
    }

    unflaggedMine() {
        this.minesLeft++;
    }

    getMinesLeft() {
        return this.minesLeft;
    }

    getBoard(): Cube[][] {
        return this.cells;
    }

    getBoardToDraw(): Array<Cube> {
        let boardInArrayFormat: Array<Cube> = new Array<Cube>();
        for(let row = 0; row < this.boardSize; row++) {
            for(let column = 0; column < this.boardSize; column++) {
                boardInArrayFormat.push(this.cells[row][column]);
            }
        }

        return boardInArrayFormat;
    }

    getBoardSize() {
        return this.boardSize;
    }
}