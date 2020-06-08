export class appController implements ng.IComponentController {
    public boardSize: number;
    public mineAmount: number;
    public renderApp: boolean = false;

    constructor() {
    }

    $onInit() {
        this.boardSize = 10;
        this.mineAmount = 10;
        this.renderApp = true;
    }

    $onChanges() {
        this.renderApp = false;
        this.renderApp = true;
    }
}

export class appComponent implements ng.IComponentOptions {
    public templateUrl = '../src/components/app/app.component.html';
    public controller = appController;
}

