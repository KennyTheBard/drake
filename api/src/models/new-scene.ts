import { StoryPart } from './story-part';

export interface NewScene extends StoryPart {
   text: string;
   prevChoiceId?: number;
   isEnding: boolean;
}