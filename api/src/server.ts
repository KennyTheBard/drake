import neo4j, { Driver, QueryResult } from 'neo4j-driver';
import * as dotenv from 'dotenv';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PlayController } from './controllers/play.controller';
import { SceneService } from './services/scene.service';
import { App } from './app';
import { WriteController } from './controllers/write.controller';
import { StoryService } from './services/story.service';
import { ChoiceService } from './services/choice.service';
import { authenticateUser } from './middleware/authenticate-user';

dotenv.config();

var driver: Driver = neo4j.driver('neo4j://localhost:7687');

const services = {
   auth: new AuthService(driver),
   story: new StoryService(driver),
   scene: new SceneService(driver),
   choice: new ChoiceService(driver),
}

const app = new App(
   [
      new AuthController(services.auth),
      new PlayController(services.scene),
      new WriteController(authenticateUser(services.auth), services.story, services.scene, services.choice),
   ],
   parseInt(process.env.PORT),
);

app.listen();

driver.close()