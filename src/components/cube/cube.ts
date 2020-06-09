import {States} from '../../models/States';
import {stateToImage} from '../../models/imageToState';

export class Cube {
    private image: string;
    private state: string;
    private opened: boolean;
    private isMine: boolean;
    private adjacentMines: number;

    constructor(state: string) {
        this.image = stateToImage.get(state);
        this.state = state;
        this.isMine = false;
        this.opened = false;
        this.adjacentMines = 0;
    }

    getImage(): string {
        return this.image;
    }

    getImageByState(state: string): string {
        return stateToImage.get(state);
    }

    getState(): string {
        return this.state;
    }

    setMine(): boolean {
        if (this.state === "facingDown") {
            this.changeState("bomb");
            this.isMine = true;
            return true;
        }

        return false;
    }

    setFlag(): boolean {
        if (this.opened) { return false; }

        if (this.isFlagged()) {
            this.changeState(this.adjacentMines.toString());
        } else {
            this.changeState("flag");
        }

        return true;
    }

    setAdjacentMines(numOfMines: number) {
        this.adjacentMines = numOfMines;
    }

    changeState(state: string): void {
        this.image = stateToImage.get(state);
        this.state = state;
    }

    open() {
        if (this.opened) return;

        this.opened = true;
        if (this.isBomb()) {
            this.changeState("bomb");
        } else {
            this.changeState(this.adjacentMines.toString());
        }
    }

    isOpened(): boolean {
        return this.opened;
    }

    isFlagged(): boolean {
        return this.state === 'flag';
    }

    isBomb(): boolean {
        return this.isMine;
    }
}