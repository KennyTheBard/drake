import { Driver } from 'neo4j-driver';
import { EndingScene } from '../models/ending-scene';
import { NewScene } from '../models/new-scene';
import { UpdateScene } from '../models/update-scene';

export class SceneService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   createScene = async (newScene: NewScene) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY) WHERE ID(story) = $storyId AND ID(user) = $authorId ' +
         'MERGE (scene:SCENE {text: $text})-[:PART_OF]->(story) ' +
         (newScene.prevChoiceId ?
            'MATCH (choice:CHOICE)-[:PART_OF]->(story) WHERE ID(choice) = $prevChoiceId ' +
            'MERGE (choice)-[:NEXT]->(scene) ' : '') +
         'RETURN ID(scene) AS id',
         newScene
      );
      await session.close();

      return result.records[0].get('id');
   }

   updateScene = async (updateSceneDto: UpdateScene) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' + 
         'WHERE ID(user) = $authorId AND ID(story) = $storyId AND ID(scene) = $sceneId' +
         'SET scene.text = $text',
         updateSceneDto
      );
      await session.close();
   }

   markAsEnding = async (endingSceneDto: EndingScene) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (user:USER)-[:AUTHORS]->(story:STORY)<-[:PART_OF]-(scene:SCENE) ' +
         'WHERE ID(user) = $authorId AND ID(story) = $storyId AND ID(scene) = $sceneId' +
         'SET scene.ending = $ending',
         endingSceneDto
      );
      await session.close();
   }

}