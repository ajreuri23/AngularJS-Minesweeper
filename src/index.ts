import 'angular-right-click';
import 'bootstrap';
import {cubeComponent} from './cube/cube.component';
import {boardComponent} from './board/board.component';
import {navbarComponent} from './navbar/navbar.component';

angular.module('minesweeper', ['ngRightClick']).component('cube', new cubeComponent()).component('board', new boardComponent()).component('navbar', new navbarComponent());

console.log("hello world!");

