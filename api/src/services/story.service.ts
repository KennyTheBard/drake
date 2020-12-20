import { Driver } from "neo4j-driver";


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
      const result = await session.run(
         'MATCH (s:SCENE) WHERE ID(s) = $id SET s.text = $text', {
            id, text,
         }
      );
      await session.close();
   }

}