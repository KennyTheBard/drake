import { Driver } from "neo4j-driver";
import { NewStory } from '../models/new-story';
import { StartingScene } from '../models/starting-scene';


export class StoryService {

   constructor(
      private readonly neo4jDriver: Driver
   ) { }

   createStory = async (newStoryDto: NewStory) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER) WHERE ID(user) = $authorId ' +
         'CREATE (scene:STORY {title: $title, description: $description}) ' +
         'MERGE (user)-[:AUTHORS]->(scene) ' +
         'RETURN ID(scene) AS id',
         newStoryDto
      );
      await session.close();

      return result.records[0].toObject();
   }

   updateStory = async (id: number, text: string) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (scene:SCENE) WHERE ID(scene) = $id ' +
         'SET scene.text = $text', {
         id, text,
      }
      );
      await session.close();
   }

   setStartingScene = async (startingSceneDto: StartingScene): Promise<number> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER) WHERE ID(user) = $authorId ' +
         'MATCH (user)-[:AUTHORS]->(story:STORY) WHERE ID(story) = $storyId ' +
         'MATCH (scene:SCENE) WHERE ID(scene) = $startingSceneId ' +
         'MATCH (story)-[r:STARTS_WITH]->(:SCENE) DELETE r ' +
         'MERGE (story)-[:STARTS_WITH]->(scene) ' +
         'RETURN scene',
         startingSceneDto
      );
      await session.close();

      return result.records.length;
   }

}