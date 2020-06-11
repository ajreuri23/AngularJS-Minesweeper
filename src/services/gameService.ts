import { Cube } from '../components/cube/cube';
import { gameStates } from '../models/enums/gameStates';
import { Board } from '../components/board/board';
import { cubeStates } from '../models/enums/States';
import { adjacentMinesToState } from '../models/maps/adjacentMinesToState';

export class gameService {
    static initializeBoard(size:number): Board {
        let board = new Board(size);
        board = this.setMines(board);
        board = this.assignAdjacentMines(board);

        return board;
    }

    static assignAdjacentMines(board: Board): Board {
        let amountOfMines: number;

        for (let row = 0; row < board.getBoardSize(); row++) {
            for (let column = 0; column < board.getBoardSize(); column++) {
                if (!board.getCells()[row][column].isBomb()) {
                    amountOfMines = this.getAdjacentMines(board, row, column);

                    board.getCells()[row][column].changeState(adjacentMinesToState.get(amountOfMines));
                    board.getCells()[row][column].setAdjacentMines(amountOfMines);
                }
            }
        }

        return board;
    }

    static getAdjacentMines(board: Board, row: number, column: number): number {
        let amountOfMines: number = 0;
        let possibilites: Array<[number, number]> = this.getPossibleNeighborsForCube(board, row, column);

        possibilites.forEach(possibility => {
            if (board.getCells()[possibility[0]][possibility[1]].isBomb()) amountOfMines++;
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
        let amountOfMines: number = board.getAmountOfMines();
        let boardSize: number = board.getBoardSize();
        let minePlaced: boolean;

        for (let mineIterator = 0; mineIterator < amountOfMines; mineIterator++) {
            minePlaced = false;
            let randomRow: number = Math.floor(Math.random() * boardSize);
            let randomColumn: number = Math.floor(Math.random() * boardSize);

            while (!minePlaced) {
                minePlaced = board.getCells()[randomRow][randomColumn].setMine();
                randomRow = Math.floor(Math.random() * boardSize);
                randomColumn = Math.floor(Math.random() * boardSize);
            }
        }

        return board;
    }

    static openCube(cube: Cube, board: Board, row: number, column: number) {
        if (cube.isOpen()) { return cube; }
        if (cube.getState() === cubeStates.flag) { board.increaseFlaggedCubesAmount(); }
        if (cube.isBomb()) { this.endGame(board, false) }

        cube.open();
        board.increaseOpenedCubeAmount();

        if (!this.checkAllCellsOpened(board)) {
            if (cube.getState() === cubeStates.zero) {
                let possibilites = this.getPossibleNeighborsForCube(board, row, column);

                possibilites.forEach(possibility => {
                    let cubeToOpen = board.getCells()[possibility[0]][possibility[1]];
                    this.openCube(cubeToOpen, board, possibility[0], possibility[1]);
                })
            }
        }

        return cube;
    }

    static endGame(board: Board, isWon: boolean) {
        for (let row = 0; row < board.getBoardSize(); row++) {
            for (let column = 0; column < board.getBoardSize(); column++) {
                board.getCells()[row][column].open();
            }
        }

        if (isWon) {
            board.endGame(gameStates.Won);
        } else {
            board.endGame(gameStates.Lost);
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
