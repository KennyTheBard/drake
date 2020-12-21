import { Driver } from "neo4j-driver";
import { User } from "../models/user";
import { v4 as uuid } from 'uuid';

export class AuthService {

   constructor(
      private readonly neo4jDriver: Driver
   ) {}

   register = async (username: string, password: string) => {
      const session = this.neo4jDriver.session();
      const existingUsers = await session.run(
         'MATCH (u:USER {username: $username}) RETURN u', {
            username
         }
      );

      if (existingUsers.records.length > 0) {
         throw new Error('Username already taken');
      }

      await session.run(
         'CREATE (u:USER {username: $username, password: $password}) RETURN u', {
            username, password
         }
      );
      await session.close();
   }

   login = async (username: string, password: string) => {
      const session = this.neo4jDriver.session();
      const existingUsers = await session.run(
         'MATCH (u:USER {username: $username, password: $password}) RETURN u.username AS username, u.authToken AS authToken', {
            username, password
         }
      );

      if (existingUsers.records.length === 0) {
         throw new Error('Wrong credentials');
      }

      let authToken: string = existingUsers.records[0].get('authToken');
      if (!authToken) {
         authToken = uuid();
         await session.run(
            'MATCH (u:USER {username: $username, password: $password}) SET u.authToken = $authToken', {
               username, password, authToken
            }
         );
      }

      await session.close();

      return authToken;
   }

   validate = async (authToken: string): Promise<User | null> => {
      const session = this.neo4jDriver.session();
      const existingUsers = await session.run(
         'MATCH (u:USER {authToken: $authToken}) RETURN ID(u) AS id, u.username AS username', {
            authToken
         }
      );
      await session.close();

      return existingUsers.records.length > 0 ? {
         id: existingUsers.records[0].get('id'),
         username: existingUsers.records[0].get('username'),
         authToken
      } : null;
   }

}