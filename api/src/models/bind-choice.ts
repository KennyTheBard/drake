import { StoryPart } from './story-part';

export interface BindChoice extends StoryPart {
   choiceId: number;
   prevSceneId: number;
}