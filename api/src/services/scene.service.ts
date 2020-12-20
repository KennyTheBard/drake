import { Driver } from "neo4j-driver";
import { Choice } from "../models/choice";
import { Scene } from "../models/scene";


export class SceneService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   getCurrentForCharacter = async (characterId: number) : Promise<Scene> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (pc:PC) WHERE ID(pc) = $id MATCH (pc)-[:PLAYING]->(s:SCENE) MATCH (s)-[r:CHOOSE]->(c:CHOICE)' +
         'RETURN ID(pc) AS sceneId, s.text AS sceneText, s.ending AS ending, ID(c) AS choiceId, c.text AS choiceText ' +
         'ORDER BY r.priority DESC', {
            id: characterId,
         }
      );
      await session.close();

      return {
         id: result.records[0].get('sceneId'),
         text: result.records[0].get('sceneText'),
         ending: result.records[0].get('ending'),
         choices: result.records.map(r => {
            id: r.get('choiceId');
            text: r.get('choiceText');
         }) as unknown as Choice[]
      }
   }

   createScene = async (choiceId: number, text: string) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (c:CHOICE) WHERE ID(c) = $choiceId MERGE (c)-[:NEXT]->(s:SCENE {text: $text}) RETURN ID(s) AS id', {
            choiceId, text
         }
      );
      await session.close();

      return result.records[0].get('id');
   }

   updateScene = async (id: number, text: string) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (s:SCENE) WHERE ID(s) = $id SET s.text = $text', {
            id, text,
         }
      );
      await session.close();
   }

   markAsEnding = async (id: number, ending: boolean) => {
      const session = this.neo4jDriver.session();
      await session.run(
         'MATCH (s:SCENE) WHERE ID(s) = $id SET s.ending = $ending', {
            id, ending,
         }
      );
      await session.close();
   }

}