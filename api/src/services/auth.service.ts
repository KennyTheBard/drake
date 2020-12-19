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
         'MATCH (u:USER {username: $username, password: $password}) RETURN u', {
            username, password
         }
      );

      if (existingUsers.records.length === 0) {
         throw new Error('Wrong credentials');
      }

      const user = existingUsers.records[0] as unknown as User;
      if (!user.authToken) {
         user.authToken = uuid();
         await session.run(
            'MATCH (u:USER {username: $username, password: $password}) SET u.authToken = $authToken', {
               username, password, authToken: user.authToken
            }
         );
      }

      await session.close();

      return user.authToken;
   }

}