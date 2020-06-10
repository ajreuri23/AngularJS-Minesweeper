import {Difficulties} from '../../models/Difficulties';

export class appController implements ng.IComponentController {
    public boardSize: number;

    $onInit() {
        this.boardSize = Difficulties.Easy;
    }

    updateSize(size: number) {
        this.boardSize = size;
    }
}

export class appComponent implements ng.IComponentOptions {
    public templateUrl = '../src/components/app/app.component.html';
    public controller = appController;
}

