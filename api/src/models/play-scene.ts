import { Choice } from './choice';
import { Scene } from './scene';


export interface PlayScene extends Scene {
   choices: Choice[]
}