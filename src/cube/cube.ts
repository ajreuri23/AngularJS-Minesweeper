const imageState: Map<string, string> = new Map<string, string>([
    ["flag", "../../assets/flagged.png"],
    ["bomb", "../../assets/bomb.png"],
    ["facingDown", "../../assets/facingDown.png"],
    ["0", "../../assets/0.png"],
    ["1", "../../assets/1.png"],
    ["2", "../../assets/2.png"],
    ["3", "../../assets/3.png"],
    ["4", "../../assets/4.png"],
    ["5", "../../assets/5.png"],
    ["6", "../../assets/6.png"],
    ["7", "../../assets/7.png"],
    ["8", "../../assets/8.png"],

]);

export class Cube {
    private image: string = "../assets/flag.png";
    private state: string;
    private opened: boolean;
    private isMine: boolean;
    private adjacentMines: number;

    constructor(state: string) {
        this.image = imageState.get(state);
        this.state = state;
        this.isMine = false;
        this.opened = false;
        this.adjacentMines = 0;
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
            console.log("After changing flag to state: " + this.getState());
        } else {
            this.changeState("flag");
            console.log("After changing to flag: " + this.getState());
        }

        return true;
    }

    setAdjacentMines(numOfMines: number) {
        this.adjacentMines = numOfMines;
    }

    changeState(state: string): void {
        this.image = imageState.get(state);
        this.state = state;
    }

    getImage(): string {
        return this.image;
    }

    getImageByState(state: string): string {
        return imageState.get(state);
    }

    getState(): string {
        return this.state;
    }

    isBomb(): boolean {
        return this.isMine;
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
}