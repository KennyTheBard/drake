import { Driver } from "neo4j-driver";
import { NewStory } from '../models/new-story';
import { Scene } from '../models/scene';
import { StartingScene } from '../models/starting-scene';
import { Story } from '../models/story';
import { StoryPart } from '../models/story-part';


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

   getStory = async (authorId: number, storyId: number): Promise<Story> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY) ' +
         'WHERE ID(user) = $authorId AND ID(story) = $storyId ' +
         'RETURN ID(story) AS id, story.title AS title, story.description AS description, ID(user) AS authorId', {
         authorId, storyId
      }
      );
      await session.close();

      return result.records[0].toObject() as Story;
   }

   getAllStories = async (authorId: number): Promise<Story[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY) WHERE ID(user) = $authorId ' +
         'RETURN ID(story) AS id, story.title AS title, story.description AS description, ID(user) AS authorId', {
         authorId
      }
      );
      await session.close();

      return result.records.map(r => r.toObject() as Story);
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
      // unset previous starting scene
      await session.run(
         'MATCH (user:USER) WHERE ID(user) = $authorId ' +
         'MATCH (user)-[:AUTHORS]->(story:STORY) WHERE ID(story) = $storyId ' +
         'MATCH (story)-[r:STARTS_WITH]->(:SCENE) DELETE r',
         startingSceneDto
      );

      // set current starting scene
      const result = await session.run(
         'MATCH (user:USER) WHERE ID(user) = $authorId ' +
         'MATCH (user)-[:AUTHORS]->(story:STORY) WHERE ID(story) = $storyId ' +
         'MATCH (story)<-[:PART_OF]-(scene:SCENE) WHERE ID(scene) = $startingSceneId ' +
         'MERGE (story)-[:STARTS_WITH]->(scene)',
         startingSceneDto
      );

      await session.close();

      return result.records.length;
   }

   getStartingScene = async (storyPartDto: StoryPart): Promise<Scene> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER) WHERE ID(user) = $authorId ' +
         'MATCH (user)-[:AUTHORS]->(story:STORY) WHERE ID(story) = $storyId ' +
         'MATCH (story)<-[:PART_OF]-(scene:SCENE)<-[:STARTS_WITH]-(story) ' +
         'RETURN ID(scene) AS id, scene.text AS text, scene.isEnding AS isEnding',
         storyPartDto
      );
      await session.close();

      return result.records[0].toObject() as unknown as Scene;
   }

}