import { Choice } from "./choice";

export interface Scene {
   id: number;
   text: string;
   ending: boolean;
   choices: Choice[];
}