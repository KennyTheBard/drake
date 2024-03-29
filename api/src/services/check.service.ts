import { Driver } from 'neo4j-driver';
import { Choice } from '../models/choice';
import { Scene } from '../models/scene';
import { StoryPart } from '../models/story-part';

export class CheckService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   checkForDeadends = async (storyPartDto: StoryPart): Promise<Scene[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND scene.isEnding = FALSE AND NOT (scene)-[:OPTION]->(:CHOICE) ' +
         'RETURN ID(scene) AS id, scene.text AS text, scene.isEnding AS isEnding',
         storyPartDto
      );
      await session.close();

      return result.records.map(r => r.toObject() as unknown as Scene);
   }

   checkForDanglings = async (storyPartDto: StoryPart): Promise<Choice[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(choice:CHOICE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND NOT (choice)-[:NEXT]->(:SCENE) ' +
         'RETURN ID(choice) AS id, choice.text AS text',
         storyPartDto
      );
      await session.close();

      return result.records.map(r => r.toObject() as unknown as Choice);
   }

   checkForFakeEndings = async (storyPartDto: StoryPart): Promise<Scene[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND scene.isEnding = TRUE ' +
         'MATCH (scene)-[:OPTION]->(choice:CHOICE) WITH scene, COUNT(choice) AS choicesNum ' +
         'WHERE choicesNum > 0 ' +
         'RETURN ID(scene) AS id, scene.text AS text, scene.isEnding AS isEnding',
         storyPartDto
      );
      await session.close();

      return result.records.map(r => r.toObject() as unknown as Scene);
   }

   checkForUnreachable = async (storyPartDto: StoryPart): Promise<Scene[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY), ' +
         '(story)-[:STARTS_WITH]->(startingScene:SCENE), ' +
         '(story)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId ' +
         'AND NOT EXISTS ((startingScene)-[*]->(scene))' +
         'RETURN ID(scene) AS id, scene.text AS text, scene.isEnding AS isEnding',
         storyPartDto
      );
      await session.close();

      return result.records.map(r => r.toObject() as unknown as Scene);
   }

   checkForOrphan = async (storyPartDto: StoryPart): Promise<Choice[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY), ' +
         '(story)<-[:PART_OF]-(choice:CHOICE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId ' +
         'AND NOT EXISTS ((:SCENE)-[:OPTION]->(choice))' +
         'RETURN ID(choice) AS id, choice.text AS text',
         storyPartDto
      );
      await session.close();

      return result.records.map(r => r.toObject() as unknown as Choice);
   }

}