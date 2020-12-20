import { Driver } from 'neo4j-driver';

export class SceneService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

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