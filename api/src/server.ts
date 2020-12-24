import neo4j, { Driver } from 'neo4j-driver';
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
import { InstanceManager } from './util/instance-manager';
import { PlayService } from './services/play.service';
import { ReadController } from './controllers/read.controller';
import { winstonLogger } from './util/logger';
import { CheckService } from './services/check.service';
import { CheckController } from './controllers/check.controller';
import { EraseController } from './controllers/erase.controller';

dotenv.config();

var driver: Driver = neo4j.driver(
   'neo4j://localhost:7687',
   undefined,
   {
      disableLosslessIntegers: true,
      logging: {
         level: 'error',
         logger: (level, message) => {
            winstonLogger.log(level, message);
         }
      }
   }
);

InstanceManager.register(new AuthService(driver));
InstanceManager.register(new StoryService(driver));
InstanceManager.register(new SceneService(driver));
InstanceManager.register(new ChoiceService(driver));
InstanceManager.register(new PlayService(driver));
InstanceManager.register(new CheckService(driver));


const app = new App(
   [
      new AuthController(),
      new PlayController([
         authenticateUser(InstanceManager.get(AuthService)),
      ]),
      new ReadController([
         authenticateUser(InstanceManager.get(AuthService)),
      ]),
      new WriteController([
         authenticateUser(InstanceManager.get(AuthService)),
      ]),
      new CheckController([
         authenticateUser(InstanceManager.get(AuthService)),
      ]),
      new EraseController([
         authenticateUser(InstanceManager.get(AuthService)),
      ]),
   ],
   parseInt(process.env.PORT),
);

app.listen();

driver.close()