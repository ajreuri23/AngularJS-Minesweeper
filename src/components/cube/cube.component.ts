import { Cube } from './cube';

export class cubeController implements ng.IComponentController {
    public cube: Cube;

    setFlag() {
        this.cube.setFlag();
    }
}


export class cubeComponent implements ng.IComponentOptions {
    public bindings = {
        cube: '='
    };
    public controller = cubeController;
    public templateUrl = '../src/components/cube/cube.component.html';
}

