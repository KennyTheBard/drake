import neo4j, { Driver, Neo4jError, ServerInfo } from 'neo4j-driver';
import * as dotenv from 'dotenv';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PlayController } from './controllers/play.controller';
import { SceneService } from './services/scene.service';
import cors from 'cors';
import { WriteController } from './controllers/write.controller';
import { StoryService } from './services/story.service';
import { ChoiceService } from './services/choice.service';
import { AuthenticateUserMiddleware } from './middleware/authenticate-user';
import { InstanceManager } from './util/instance-manager';
import { PlayService } from './services/play.service';
import { ReadController } from './controllers/read.controller';
import { winstonLogger } from './util/logger';
import { CheckService } from './services/check.service';
import { CheckController } from './controllers/check.controller';
import { EraseController } from './controllers/erase.controller';
import express from 'express';

const init = async () => {
   try {
      // load environment vars
      dotenv.config();

      // connect to neo4j driver
      var driver: Driver = neo4j.driver(
         process.env.NEO4j_ADDRESS,
         undefined,
         {
            // for compatibility with JS number type
            disableLosslessIntegers: true,
            // add custom logger to mongo
            logging: (process.env.ENABLE_DB_DEBUG === 'true') ? {
               level: 'error',
               logger: (level, message) => {
                  winstonLogger.log(level, message);
               }
            } : undefined
         }
      );

      // check connectivity with neo4j
      try {
         const info: ServerInfo = await driver.verifyConnectivity();
         console.log(`Connected to Neo4j: ${info.address} : ${info.version}`);
      } catch (err) {
         const neo4jErr = err as Neo4jError;
         throw new Error('Failed to connect to Neo4j instance');
      }

      // register services
      InstanceManager.register(new AuthService(driver));
      InstanceManager.register(new StoryService(driver));
      InstanceManager.register(new SceneService(driver));
      InstanceManager.register(new ChoiceService(driver));
      InstanceManager.register(new PlayService(driver));
      InstanceManager.register(new CheckService(driver));

      // init app
      const app = express();

      // add middleware
      app.use(express.json());
      app.use(cors());

      // register middleware
      InstanceManager.register(new AuthenticateUserMiddleware());

      // register controllers
      [
         new AuthController(),
         new PlayController(),
         new ReadController(),
         new WriteController(),
         new CheckController(),
         new EraseController(),
      ].forEach(controller => app.use(`${controller.path}`, controller.router))

      // start server
      const port = process.env.PORT;
      app.listen(port, () => {
         console.log(`App listening on the port ${port}`);
      });

      // close neo4j driver
      driver.close()
   } catch (err) {
      console.error(err);
   }
};

init();