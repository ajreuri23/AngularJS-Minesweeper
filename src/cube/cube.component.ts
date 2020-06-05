import { Cube } from '../cube/cube';
import { mineSweeperService } from '../gameService';

export class cubeController implements ng.IComponentController {

    static $inject: string[] = ["$element"];

    constructor(private state: any, private cube: Cube) {
        console.log("MY CUBE");
        console.log(this.cube);
    }

    $onInit(): any {
       // this.cube = new Cube(this.state);
    }

    //openCube() {
    //    this.cube = mineSweeperService.openCube(this.cube);
   // }

    setFlag() {
        console.log("meow set flag");
        this.cube.setFlag();
    }
}


export class cubeComponent implements ng.IComponentOptions {
    public bindings = {
        state: '=',
        cube: '='
    };
    public controller = cubeController;
    public templateUrl = '../src/cube/cube.component.html';
}

