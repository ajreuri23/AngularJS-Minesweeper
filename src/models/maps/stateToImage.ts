import {cubeStates} from '../enums/States';

export const stateToImage: Map<cubeStates,string> = new Map<cubeStates,string>();

stateToImage.set(cubeStates.flag, "../../assets/flagged.png");
stateToImage.set(cubeStates.bomb, "../../assets/bomb.png");
stateToImage.set(cubeStates.facingDown, "../../assets/facingDown.png");
stateToImage.set(cubeStates.zero, "../../assets/0.png");
stateToImage.set(cubeStates.oneMine, "../../assets/1.png");
stateToImage.set(cubeStates.twoMines, "../../assets/2.png");
stateToImage.set(cubeStates.threeMines, "../../assets/3.png");
stateToImage.set(cubeStates.fourMines, "../../assets/4.png");
stateToImage.set(cubeStates.fiveMines, "../../assets/5.png");
stateToImage.set(cubeStates.sixMines, "../../assets/6.png");
stateToImage.set(cubeStates.sevenMines, "../../assets/7.png");
stateToImage.set(cubeStates.eightMines, "../../assets/8.png");
