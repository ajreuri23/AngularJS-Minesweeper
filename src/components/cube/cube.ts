import {cubeStates} from '../../models/States';
import {stateToImage} from '../../models/imageToState';
import { adjacentMinesToState } from '../../models/adjacentMinesToState';

export class Cube {
    private state: cubeStates;
    private opened: boolean;
    private isMine: boolean;
    private adjacentMines: number;

    constructor(state: cubeStates) {
        this.state = state;
        this.isMine = false;
        this.opened = false;
        this.adjacentMines = 0;
    }

    getState(): cubeStates {
        return this.state;
    }

    setMine(): boolean {
        if (this.state === cubeStates.facingDown) {
            this.changeState(cubeStates.bomb);
            this.isMine = true;
            return true;
        }

        return false;
    }

    setFlag(): boolean {
        if (this.opened) { return false; }

        if (this.isFlag()) {
            this.changeState(adjacentMinesToState.get(this.adjacentMines));
        } else {
            this.changeState(cubeStates.flag);
        }

        return true;
    }

    setAdjacentMines(numOfMines: number) {
        this.adjacentMines = numOfMines;
    }

    changeState(state: cubeStates): void {
        this.state = state;
    }

    open() {
        if (this.opened) return;

        this.opened = true;
        if (this.isBomb()) {
            this.changeState(cubeStates.bomb);
        } else {
            this.changeState(adjacentMinesToState.get(this.adjacentMines));
        }
    }

    isOpen(): boolean {
        return this.opened;
    }

    isFlag(): boolean {
        return this.state === cubeStates.flag;
    }

    isBomb(): boolean {
        return this.isMine;
    }
}