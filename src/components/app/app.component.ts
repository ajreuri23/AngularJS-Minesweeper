import {Difficulties} from '../../models/enums/Difficulties';
import {difficultyToSize} from '../../models/maps/difficultyToSize'

export class appController implements ng.IComponentController {
    public boardSize: number;

    $onInit() {
        this.boardSize = difficultyToSize.get(Difficulties.Easy);
    }

    updateSize(size: number) {
        this.boardSize = size;
    }
}

export class appComponent implements ng.IComponentOptions {
    public templateUrl = '../src/components/app/app.component.html';
    public controller = appController;
}

