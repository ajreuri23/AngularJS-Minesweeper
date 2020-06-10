import { Cube } from './cube';
import {stateToImage} from '../../models/imageToState';

export class cubeController implements ng.IComponentController {
    public cube: Cube;
    public image: string;

    setFlag() {
        this.cube.setFlag();
    }

    getImage() {
        return stateToImage.get(this.cube.getState());
    }
}


export class cubeComponent implements ng.IComponentOptions {
    public bindings = {
        cube: '='
    };
    public controller = cubeController;
    public templateUrl = '../src/components/cube/cube.component.html';
}

