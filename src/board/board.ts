import {Cube} from '../cube/cube';

export class Board {
    private board: Cube[][];
    private boardSize: number;

    constructor(size: number) {
        this.boardSize = size;
        this.board = [];

        for(let row = 0; row < size; row++) {
            this.board[row] = [];
            for(let column = 0; column < size; column++) {
                this.board[row][column] = new Cube("facingDown"); 
            }
        }
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