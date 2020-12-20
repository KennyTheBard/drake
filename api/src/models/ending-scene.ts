import { StoryPart } from './story-part';

export interface EndingScene extends StoryPart {
   sceneId: number;
   ending: boolean;
}