import { Driver } from 'neo4j-driver';
import { Choice } from '../models/choice';
import { Scene } from '../models/scene';

export class PlayService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   getCurrentScene = async (userId: number, characterId: number) : Promise<Scene> => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (u:USER)-[:CONTROLS]->(pc:PC)-[:PLAYING]->(s:SCENE)-[r:CHOOSE]->(c:CHOICE) ' +
         'WHERE ID(u) = $userId AND ID(pc) = $characterId ' +
         'RETURN ID(pc) AS sceneId, s.text AS sceneText, s.isEnding AS isEnding, ID(c) AS choiceId, c.text AS choiceText ' +
         'ORDER BY r.priority DESC', {
            userId, characterId,
         }
      );
      await session.close();

      if (result.records.length === 0) {
         throw new Error('Player character not found');
      }

      return {
         id: result.records[0].get('sceneId'),
         text: result.records[0].get('sceneText'),
         isEnding: result.records[0].get('isEnding'),
         choices: result.records.map(r => {
            id: r.get('choiceId');
            text: r.get('choiceText');
         }) as unknown as Choice[]
      }
   }

   makeChoice = async (userId: number, characterId: number, choiceId: number) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (u:USER)-[:CONTROLS]->(pc:PC)-[r:PLAYING]->(scene:SCENE)-[:OPTION]->(c:CHOICE)-[:NEXT]->(nextScene:SCENE) ' +
         'WHERE ID(u) = $userId AND ID(pc) = $characterId AND ID(c) = $choiceId ' +
         'DELET r MERGE (pc)-[:PLAYING]->(nextScene)', {
            userId, characterId, choiceId
         }
      );
      await session.close();
   }
}