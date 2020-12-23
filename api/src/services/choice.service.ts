import { Driver } from 'neo4j-driver';
import { BindOptionChoice } from '../models/bind-option-choice';
import { Choice } from '../models/choice';
import { NewChoice } from '../models/new-choice';
import { StoryPart } from '../models/story-part';
import { UpdateChoice } from '../models/update-choice';


export class ChoiceService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   createChoice = async (choice: NewChoice) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND ID(scene) = $sceneId ' +
         'CREATE (choice:CHOICE {text: $text}) ' +
         'MERGE (scene)-[:OPTION]->(choice)-[:PART_OF]->(story) ' +
         'RETURN ID(choice) AS id',
         choice
      );
      await session.close();

      return result.records[0].toObject();
   }

   getChoice = async (authorId: number, storyId: number, choiceId: number): Promise<Choice> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(choice:CHOICE) ' + 
         'WHERE ID(user) = $authorId AND ID(story) = $storyId AND ID(choice) = $choiceId ' +
         'RETURN ID(choice) AS id, choice.text AS text ', {
            authorId, storyId, choiceId
         }
      );
      await session.close();

      return result.records[0].toObject() as Choice;
   }

   getAllChoices = async (storyPartDto: StoryPart): Promise<Choice[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(choice:CHOICE) ' + 
         'WHERE ID(user) = $authorId AND ID(story) = $storyId ' +
         'RETURN ID(choice) AS id, choice.text AS text ',
         storyPartDto
      );
      await session.close();

      return result.records.map(r => r.toObject() as Choice);
   }


   updateChoice = async (updateChoiceDto: UpdateChoice) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(choice:CHOICE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND ID(choice) = $choiceId ' +
         'SET choice.text = $text',
         updateChoiceDto
      );
      await session.close();
   }

   bindAsOption = async (bindChoiceDto: BindOptionChoice) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND ID(scene) = $prevSceneId ' +
         'MATCH (story)<-[:PART_OF]-(choice:CHOICE) WHERE ID(choice) = $choiceId ' +
         'MERGE (scene)-[:OPTION]->(choice)',
         bindChoiceDto
      );
      await session.close();
   }

}