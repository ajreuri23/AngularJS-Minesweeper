import { Cube } from './cube';

export class cubeController implements ng.IComponentController {

    static $inject: string[] = ["$element"];

    constructor(private cube: Cube) {
    }

    $onInit(): any {
    }

    setFlag() {
        this.cube.setFlag();
    }
}


export class cubeComponent implements ng.IComponentOptions {
    public bindings = {
      //  state: '=',
        cube: '='
    };
    public controller = cubeController;
    public templateUrl = '../src/components/cube/cube.component.html';
}

