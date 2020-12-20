import { StoryPart } from './story-part';

export interface UpdateChoice extends StoryPart {
   choiceId: number;
   text: string;
}