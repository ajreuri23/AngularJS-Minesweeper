import { Cube } from '../cube/cube';
import { sizeToMines } from '../../models/maps/sizeToMines';
import { gameStates } from '../../models/enums/gameStates';
import { cubeStates } from '../../models/enums/States';

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
        this.amountOfMines = sizeToMines.get(size);
        this.minesLeft = this.amountOfMines;
        this.flaggedCells = this.amountOfMines;
        this.openedCells = 0;
        this.gameState = gameStates.Running;

        this.initializeCells();
    }

    initializeCells() {
        for (let row = 0; row < this.boardSize; row++) {
            this.cells[row] = [];
            for (let column = 0; column < this.boardSize; column++) {
                this.cells[row][column] = new Cube(cubeStates.facingDown);
            }
        }
    }

    getGameState() {
        return this.gameState;
    }

    getAmountOfMines() {
        return this.amountOfMines;
    }

    getOpenedCubes() {
        return this.openedCells;
    }

    getBoardSize(): number {
        return this.boardSize;
    }

    getFlaggedCubes() {
        return this.flaggedCells;
    }

    getMinesLeft() {
        return this.minesLeft;
    }

    isGameEnded() {
        return this.gameState !== gameStates.Running;
    }

    endGame(state: gameStates) {
        this.gameState = state;
    }

    getCells(): Cube[][] {
        return this.cells;
    }

    increaseOpenedCubeAmount() {
        this.openedCells++;
    }

    decreaseFlaggedCubesAmount() {
        this.flaggedCells--;
    }

    increaseFlaggedCubesAmount() {
        this.flaggedCells++;
    }

    decreaseMinesLeftAmount() {
        this.minesLeft--;
    }

    increaseMinesLeftAmount() {
        this.minesLeft++;
    }
}