import { cubeStates } from "./States";

export const adjacentMinesToState : Map<number, cubeStates> = new Map<number, cubeStates>();

adjacentMinesToState.set(0, cubeStates.zero);
adjacentMinesToState.set(1, cubeStates.oneMine);
adjacentMinesToState.set(2, cubeStates.twoMines);
adjacentMinesToState.set(3, cubeStates.threeMines);
adjacentMinesToState.set(4, cubeStates.fourMines);
adjacentMinesToState.set(5, cubeStates.fiveMines);
adjacentMinesToState.set(6, cubeStates.sixMines);
adjacentMinesToState.set(7, cubeStates.sevenMines);
adjacentMinesToState.set(8, cubeStates.eightMines);