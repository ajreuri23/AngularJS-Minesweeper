export class navbarController implements ng.IComponentController {
    public gameDifficulties: Array<[string, number]>;
    public selectedDifficulty: number;
    static $inject: string[] = ["$element"];

    constructor(public size: number) {
    }

    $onInit() {
        this.selectedDifficulty = 10;
        this.gameDifficulties = new Array<[string, number]>();
        this.gameDifficulties.push(["Easy", 10]);
        this.gameDifficulties.push(["Medium", 16]);
        this.gameDifficulties.push(["Hard", 24]);
    }

    somethingChanged() {
        this.size = this.selectedDifficulty;
    }
}

export class navbarComponent implements ng.IComponentOptions {
    public bindings = {
        size: '=',
    };
    public controller = navbarController;
    public templateUrl = '../src/components/navbar/navbar.component.html';
}

