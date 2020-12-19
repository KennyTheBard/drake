import neo4j, { Driver, QueryResult } from 'neo4j-driver';
import * as dotenv from 'dotenv';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PlayController } from './controllers/play.controller';
import { SceneService } from './services/scene.service';
import { App } from './app';

dotenv.config();

var driver: Driver = neo4j.driver('neo4j://localhost:7687');

const app = new App(
   [
      new AuthController(new AuthService(driver)),
      new PlayController(new SceneService(driver)),
   ],
   parseInt(process.env.PORT),
);

app.listen();

driver.close()