import {Board} from '../board/board';
import {Cube} from '../cube/cube';
import {mineSweeperService} from '../gameService';
import {cubeController} from '../cube/cube.component';

class boardController implements ng.IComponentController {
    public board: Board;

    constructor() {
    }

    $onInit() {
        this.board = new Board(10);
        this.board = mineSweeperService.initializeBoard(this.board, this.board.getBoardSize());
        console.log("After initialization:" + this.board);
    }

    openCube(cube:Cube, board:Board, index:number) {
        // TODO: CREATE SERVICE FUNCTION TO OPEN CUBE
        console.log("MY CUBE BEFORE OPENING");
        console.log(cube);

        console.log("MY BOARD BEFORE OPENING");
       console.log(board);

       console.log("MY INDEX BEFORE OPENING");
       console.log(index);
        cube = mineSweeperService.openCube(cube,board, index);
        this.board.assignCubeInPosition(cube, Math.floor(index / this.board.getBoardSize()), index % this.board.getBoardSize());
    }
}

export class boardComponent implements ng.IComponentOptions {
    public controller: any;
    public templateUrl: string;

    public constructor() {
        this.templateUrl = '../src/board/board.component.html';
        this.controller = boardController;
    }
}