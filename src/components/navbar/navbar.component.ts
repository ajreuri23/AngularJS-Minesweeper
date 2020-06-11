import { Difficulties } from '../../models/enums/Difficulties';

const difficulties = [{
    title: 'Easy',
    size: Difficulties.Easy
}, {
    title: 'Medium',
    size: Difficulties.Medium
}, {
    title: 'Hard',
    size: Difficulties.Hard
}];

export class navbarController implements ng.IComponentController {
    public gameDifficulties: Array<Object> = difficulties;;
    public selectedDifficulty: any = this.gameDifficulties[0];
    public update: Function;

    getSelectedDifficulty() {
        return parseInt(this.selectedDifficulty);
    }
}

export class navbarComponent implements ng.IComponentOptions {
    public bindings = {
        update: '&'
    };
    public controller = navbarController;
    public templateUrl = '../src/components/navbar/navbar.component.html';
}

