import { Cube } from '../components/cube/cube';
import { Board } from '../components/board/board';
import {sizeToMines} from '../models/sizeToMines';

export class mineSweeperService {
    static initializeBoard(board: Board): Board {
        board = this.setMines(board);
        board = this.assignAdjacentMines(board);

        return board;
    }

    static assignAdjacentMines(board: Board): Board {
        let amountOfMines: number;

        for (let row = 0; row < board.getBoardSize(); row++) {
            for (let column = 0; column < board.getBoardSize(); column++) {
                if (!board.getBoard()[row][column].isBomb()) {
                    amountOfMines = this.getAdjacentMines(board, row, column);

                    board.getBoard()[row][column].changeState(amountOfMines.toString());
                    board.getBoard()[row][column].setAdjacentMines(amountOfMines);
                }
            }
        }

        return board;
    }

    static getAdjacentMines(board: Board, row: number, column: number): number {
        let amountOfMines: number = 0;
        let possibilites: Array<[number, number]> = this.getPossibleNeighborsForCube(board, row, column);

        possibilites.forEach(possibility => {
            if (board.getBoard()[possibility[0]][possibility[1]].isBomb()) amountOfMines++;
        })

        return amountOfMines;
    }

    static getPossibleNeighborsForCube(board: Board, row: number, column: number): Array<[number, number]> {
        let maximum = board.getBoardSize();
        let possibilities: Array<[number, number]> = new Array<[number, number]>();

        if (row - 1 >= 0) {
            possibilities.push([row - 1, column]);
            if (column - 1 >= 0) {
                possibilities.push([row - 1, column - 1]);

            }
            if (column + 1 < maximum) {
                possibilities.push([row - 1, column + 1]);

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

        if (column + 1 < maximum) {
            possibilities.push([row, column + 1]);
        }

        if (column - 1 >= 0) {
            possibilities.push([row, column - 1]);
        }

        return possibilities;
    }

    static setMines(board: Board): Board {
        let amountOfMines: number = sizeToMines.get(board.getBoardSize().toString());
        let boardSize: number = board.getBoardSize();
        let minePlaced: boolean;

        for (let mineIterator = 0; mineIterator < amountOfMines; mineIterator++) {
            minePlaced = false;
            let randomRow: number = Math.floor(Math.random() * boardSize);
            let randomColumn: number = Math.floor(Math.random() * boardSize);

            while (!minePlaced) {
                minePlaced = board.getBoard()[randomRow][randomColumn].setMine();
            }
        }

        return board;
    }

    static openCube(cube: Cube, board: Board, index: number) {
        if (cube.isOpened()) { return cube; }
        if (cube.getState() === 'flag') { board.unflaggedCube(); }
        if (cube.isBomb()) { this.endGame(board, false) }

        let row = Math.floor(index / board.getBoardSize());
        let column = index % board.getBoardSize();

        cube.open();
        board.openedCube();

        if (!this.checkAllCellsOpened(board)) {
            if (cube.getState() === '0') {
                let possibilites = this.getPossibleNeighborsForCube(board, row, column);

                possibilites.forEach(possibility => {
                    let cubeToOpen = board.getBoard()[possibility[0]][possibility[1]];
                    this.openCube(cubeToOpen, board, (possibility[0] * board.getBoardSize()) + possibility[1]);
                })
            }
        }

        return cube;
    }

    static endGame(board: Board, isWon: boolean) {
        for (let row = 0; row < board.getBoardSize(); row++) {
            for (let column = 0; column < board.getBoardSize(); column++) {
                board.getBoard()[row][column].open();
            }
        }

        if (isWon) {
            board.endGame("YOU WON MY MAN");
        } else {
            board.endGame("YOU LOST MY BRO");
        }

    }

    static checkAllCellsOpened(board: Board): boolean {
        if (board.getOpenedCubes() === board.getBoardSize() * board.getBoardSize() - board.getAmountOfMines()) {
            this.endGame(board, true);
            return true;
        }

        return false;
    }
}
