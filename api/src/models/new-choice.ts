import { StoryPart } from './story-part';

export interface NewChoice extends StoryPart {
   text: string;
   sceneId: number;
}