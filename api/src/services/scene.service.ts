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
         'MATCH (pc:PC {id: $id}) MATCH (pc)-[:PLAYING]->(s:SCENE) MATCH (s)-[r:CHOOSE]->(c:CHOICE)' +
         'RETURN s.text AS sceneText, c.text AS choiceText ORDER BY r.priority DESC', {
            id: characterId,
         }
      );
      await session.close();

      return {
         text: result.records[0].get('sceneText'),
         choices: result.records.map(r => {
            text: r.get('choiceText');
         }) as unknown as Choice[]
      }
   }

}