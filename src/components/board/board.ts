import {Cube} from '../cube/cube';

export class Board {
    private board: Cube[][];
    private boardSize: number;
    private minesLeft: number;
    private amountOfMines: number;
    private flaggedCells: number;
    private openedCells: number;
    private gameEnded: boolean;
    private gameMessage: string;

    constructor(size: number, mines: number) {
        this.boardSize = size;
        this.amountOfMines = mines;
        this.board = [];
        this.minesLeft = mines;
        this.openedCells = 0;
        this.flaggedCells = mines;
        this.gameEnded = false;

        for(let row = 0; row < size; row++) {
            this.board[row] = [];
            for(let column = 0; column < size; column++) {
                this.board[row][column] = new Cube("facingDown"); 
            }
        }
    }

    getAmountOfMines() {
        return this.amountOfMines;
    }

    getGameMessage() {
        return this.gameMessage;
    }

    isGameEnded() {
        return this.gameEnded;
    }

    endGame(message: string) {
        this.gameMessage = message;
        this.gameEnded = true;
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
        return this.board;
    }

    getBoardToDraw(): Array<Cube> {
        let boardInArrayFormat: Array<Cube> = new Array<Cube>();
        for(let row = 0; row < this.boardSize; row++) {
            for(let column = 0; column < this.boardSize; column++) {
                boardInArrayFormat.push(this.board[row][column]);
            }
        }

        return boardInArrayFormat;
    }

    assignCubeInPosition(cube:Cube, row:number, column:number) {
        this.board[row][column] = cube;
    }

    getBoardSize() {
        return this.boardSize;
    }
}