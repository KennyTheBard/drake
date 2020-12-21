import { Driver } from 'neo4j-driver';
import { NewChoice } from '../models/new-choice';
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

}