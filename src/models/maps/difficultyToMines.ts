import { Difficulties } from '../enums/Difficulties';

export const difficultyToMines: Map<Difficulties, number> = new Map<Difficulties, number>();

difficultyToMines.set(Difficulties.Easy, 10);
difficultyToMines.set(Difficulties.Medium, 40);
difficultyToMines.set(Difficulties.Hard, 99);