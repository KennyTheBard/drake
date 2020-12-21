import { Choice } from './choice';

export interface Scene {
   id: number;
   text: string;
   isEnding: boolean;
   choices: Choice[];
}