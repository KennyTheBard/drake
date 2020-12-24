import { Driver } from 'neo4j-driver';
import { BindNextScene } from '../models/bind-next-scene';
import { EndingScene } from '../models/ending-scene';
import { NewScene } from '../models/new-scene';
import { Scene } from '../models/scene';
import { UpdateScene } from '../models/update-scene';

export class SceneService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   createScene = async (newScene: NewScene) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY) ' + 
         'WHERE ID(story) = $storyId AND ID(user) = $authorId ' +
         'CREATE (scene:SCENE {text: $text, isEnding: $isEnding}) ' +
         'MERGE (scene)-[:PART_OF]->(story) ' +
         (newScene.prevChoiceId ?
            'WITH story, scene ' +
            'MATCH (choice:CHOICE)-[:PART_OF]->(story) WHERE ID(choice) = $prevChoiceId ' +
            'MERGE (choice)-[:NEXT]->(scene) ' : '') +
         'RETURN ID(scene) AS id',
         newScene
      );
      await session.close();

      return result.records[0].toObject();
   }

   getScene = async (authorId: number, storyId: number, sceneId: number): Promise<Scene> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' + 
         'WHERE ID(user) = $authorId AND ID(story) = $storyId AND ID(scene) = $sceneId ' +
         'RETURN ID(scene) AS id, scene.text AS text, scene.isEnding AS isEnding ', {
            authorId, storyId, sceneId
         }
      );
      await session.close();

      return result.records[0].toObject() as Scene;
   }

   getAllScenes = async (authorId: number, storyId: number): Promise<Scene[]> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' + 
         'WHERE ID(user) = $authorId AND ID(story) = $storyId ' +
         'RETURN ID(scene) AS id, scene.text AS text, scene.isEnding AS isEnding ', {
            authorId, storyId
         }
      );
      await session.close();

      return result.records.map(r => r.toObject() as Scene);
   }

   updateScene = async (updateSceneDto: UpdateScene) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' + 
         'WHERE ID(user) = $authorId AND ID(story) = $storyId AND ID(scene) = $sceneId ' +
         'SET scene.text = $text',
         updateSceneDto
      );
      await session.close();
   }

   markAsEnding = async (endingSceneDto: EndingScene) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(user) = $authorId AND ID(story) = $storyId AND ID(scene) = $sceneId ' +
         'SET scene.isEnding = $isEnding',
         endingSceneDto
      );
      await session.close();
   }

   bindAsNext = async (bindSceneDto: BindNextScene) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND ID(scene) = $nextSceneId ' +
         'MATCH (story)<-[:PART_OF]-(choice:CHOICE) WHERE ID(choice) = $choiceId ' +
         'MERGE (choice)-[:NEXT]->(scene)',
         bindSceneDto
      );
      await session.close();
   }

   deleteScene = async (authorId: number, storyId: number, sceneId: number) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(story) = $storyId AND ID(user) = $authorId AND ID(scene) = $sceneId ' +
         'DETACH DELETE scene', {
            authorId, storyId, sceneId   
         });
      await session.close();
   }

}