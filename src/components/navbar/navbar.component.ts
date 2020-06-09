import { Difficulties } from '../../models/Difficulties';

export class navbarController implements ng.IComponentController {
    public gameDifficulties: Array<Object>;
    public selectedDifficulty: number;
    public size: number;

    constructor() {
    }

    $onInit() {
        this.selectedDifficulty = Difficulties.Easy;
        this.gameDifficulties = [{
            title: 'Easy',
            size: Difficulties.Easy
        }, {
            title: 'Medium',
            size: Difficulties.Medium
        }, {
            title: 'Hard',
            size: Difficulties.Hard
        }]

    };

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

