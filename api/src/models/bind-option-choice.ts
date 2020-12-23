import { StoryPart } from './story-part';

export interface BindOptionChoice extends StoryPart {
   choiceId: number;
   prevSceneId: number;
}