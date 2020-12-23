import { StoryPart } from './story-part';

export interface BindNextScene extends StoryPart {
   choiceId: number;
   nextSceneId: number;
}