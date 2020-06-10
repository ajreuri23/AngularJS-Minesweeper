import 'angular-right-click';
import 'bootstrap';
import { cubeComponent } from './components/cube/cube.component';
import { boardComponent } from './components/board/board.component';
import { navbarComponent } from './components/navbar/navbar.component';
import { appComponent } from './components/app/app.component';
import { messageComponent } from './components/message/message.component';
import { gameService } from './services/gameService';

angular.module('minesweeper', ['ngRightClick'])
    .service('gameService', gameService)
    .component('cube', new cubeComponent())
    .component('board', new boardComponent())
    .component('navbar', new navbarComponent())
    .component('message', new messageComponent())
    .component('app', new appComponent());

console.log("hello world!");

