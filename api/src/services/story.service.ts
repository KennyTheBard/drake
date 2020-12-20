import { Driver } from "neo4j-driver";
import { StartingScene } from '../models/starting-scene';


export class StoryService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   createStory = async (userId: number, title: string, description: string) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (u:USER) WHERE ID(u) = $userId MERGE (u)-[:AUTHORS]->(s:STORY {title: $title, description: $description}) RETURN ID(s) AS id', {
            userId, title, description
         }
      );
      await session.close();

      return result.records[0].get('id');
   }

   updateStory = async (id: number, text: string) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (s:SCENE) WHERE ID(s) = $id SET s.text = $text', {
            id, text,
         }
      );
      await session.close();
   }

   setStartingScene = async (startingSceneDto: StartingScene) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER) WHERE ID(user) = $userId ' +
         'MATCH (user)-[:AUTHORS]->(story:STORY) WHERE ID(story) = $storyId ' +
         'MATCH (scene:SCENE) WHERE ID(scene) = $startingSceneId ' +
         'MATCH (story)-[r:STARTS_WITH]->(:SCENE) DELETE r ' +
         'MERGE (story)-[:STARTS_WITH]->(scene)',
         startingSceneDto
      );
      await session.close();
   }

}