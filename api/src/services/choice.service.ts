import { Driver } from "neo4j-driver";
import { Choice } from "../models/choice";
import { Scene } from "../models/scene";


export class ChoiceService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   createChoice = async (sceneId: number, text: string) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (s:SCENE) WHERE ID(s) = $sceneId MERGE (s)-[r:OPTION]->(c:CHOICE {text: $text}) RETURN ID(c) AS id', {
            sceneId, text,
         }
      );
      await session.close();

      return result.records[0].get('id');
   }

   updateChoice = async (id: number, text: string) => {
      const session = this.neo4jDriver.session();
      const result = await session.run(
         'MATCH (s:CHOICE) WHERE ID(s) = $id SET s.text = $text', {
            id, text,
         }
      );
      await session.close();
   }

}