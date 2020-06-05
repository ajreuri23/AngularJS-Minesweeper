import { Cube } from './cube/cube';
import { Board } from './board/board';

const sizeToAmountOfMines: Map<string, number> = new Map<string, number>([
    ["10", 10],
    ["16", 40],
    ["24", 99]
]);

export class mineSweeperService {
    static initializeBoard(board: Board, size: number): Board {
        board = this.setMines(board);
        board = this.assignAdjacentMines(board);

        console.log("Board after initialization: ");
        console.log(board);

        return board;
    }

    static assignAdjacentMines(board: Board) {
        for (let row = 0; row < board.getBoardSize(); row++) {
            for (let column = 0; column < board.getBoardSize(); column++) {
                if (!board.getBoard()[row][column].isBomb()) {
                    let amountOfMines = this.getAdjacentMines(board, row, column);
                    board.getBoard()[row][column].changeState(amountOfMines.toString());
                    board.getBoard()[row][column].setAdjacentMines(amountOfMines);
                }
            }
        }

        console.log("BOARD AFTER ASSIGNING MINES: ");
        console.log(board);
        return board;
    }

    static getAdjacentMines(board: Board, row: number, column: number) {
        let amountOfMines: number = 0;
        let possibilites: Array<[number, number]> = this.getPossiblePositions(board, row, column);

        possibilites.forEach(array => {
            if (board.getBoard()[array[0]][array[1]].isBomb()) amountOfMines++;
        })

        return amountOfMines;
    }

    static getPossiblePositions(board: Board, row: number, column: number) {
        let maximum = board.getBoardSize();
        let possibilities: Array<[number, number]> = new Array<[number, number]>();
        if (row - 1 >= 0) {
            possibilities.push([row - 1, column]);
            if (column - 1 >= 0) {
                possibilities.push([row - 1, column - 1]);
                possibilities.push([row, column - 1]);
            }
            if (column + 1 < maximum) {
                possibilities.push([row - 1, column + 1]);
                possibilities.push([row, column + 1]);
            }
        }

        if (row + 1 < maximum) {
            possibilities.push([row + 1, column]);
            if (column - 1 >= 0) {
                possibilities.push([row + 1, column - 1]);
            }

            if (column + 1 < maximum) {
                possibilities.push([row + 1, column + 1]);
            }
        }

        return possibilities;
    }

    static setMines(board: Board): Board {

        let amountOfMines: number = sizeToAmountOfMines.get(board.getBoardSize().toString());
        let boardSize: number = board.getBoardSize();
        let minePlaced: boolean;

        for (let mineIterator = 0; mineIterator < amountOfMines; mineIterator++) {
            minePlaced = false;

            while (!minePlaced) {
                minePlaced = board.getBoard()[Math.floor(Math.random() * board.getBoardSize())][Math.floor(Math.random() * board.getBoardSize())].setMine();
            }
        }

        return board;
    }

    static openCube(cube: Cube, board: Board, index:number) {
        console.log("IN FUNCTION OPEN CUBE IN SERVICE");
        console.log(cube);
        if (cube.isOpened()) { return cube; }
        if(cube.isBomb()) {this.endGame(board)}

        console.log("AFTER CHECKING IF CUBE IS OPENED");

        console.log("BEFORE OPENING CUBE: ");
        console.log(cube);

        cube.open();

        console.log("AFTER OPENING CUBE: ");
        console.log(cube);
        return cube;
    }

    static endGame(board: Board) {
        for(let row = 0; row < board.getBoardSize(); row++) {
            for(let column = 0; column < board.getBoardSize(); column++) {
                board.getBoard()[row][column].open();
            }
        }
    }
}
