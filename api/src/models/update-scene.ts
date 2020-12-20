import { StoryPart } from './story-part';

export interface UpdateScene extends StoryPart {
   sceneId: number;
   text: string;
}