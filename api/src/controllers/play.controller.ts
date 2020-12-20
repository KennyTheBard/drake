import { Request, RequestHandler, Response, Router } from 'express';
import { PlayService } from '../services/play.service';
import { InstanceManager } from '../util/instance-manager';

export class PlayController {

   public path = '/play';
   public router = Router();

   private playService: PlayService;

   constructor(
      middlewares?: RequestHandler[],
   ) {
      this.playService = InstanceManager.get(PlayService);

      if (middlewares) middlewares.forEach(mw => this.router.use(mw));

      this.router.post(`${this.path}`, this.getCurrentScene)
   }

   getCurrentScene = async (req: Request, res: Response) => {
      const characterId = req.query['characterId'];
      if (typeof characterId !== 'string') {
         throw new Error('Wrong format for characterId');
      }
      
      res.send(await this.playService.getCurrentScene(req.user.id, parseInt(characterId)));
   }

   makeChoice = async (req: Request, res: Response) => {
      const characterId = req.query['characterId'];
      if (typeof characterId !== 'string') {
         throw new Error('Wrong format for characterId');
      }

      const choiceId = req.query['choiceId'];
      if (typeof choiceId !== 'string') {
         throw new Error('Wrong format for choiceId');
      }

      res.send(await this.playService.makeChoice(req.user.id, parseInt(characterId), parseInt(choiceId)));
   }

}