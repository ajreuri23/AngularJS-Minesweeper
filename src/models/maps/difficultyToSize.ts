import { Difficulties } from '../enums/Difficulties';

export const difficultyToSize: Map<Difficulties, number> = new Map<Difficulties, number>();

difficultyToSize.set(Difficulties.Easy, 10);
difficultyToSize.set(Difficulties.Medium, 16);
difficultyToSize.set(Difficulties.Hard, 24);