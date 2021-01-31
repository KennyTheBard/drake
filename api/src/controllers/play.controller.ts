import { AuthenticateUserMiddleware } from './../middleware/authenticate-user';
import { Request, Response, Router } from 'express';
import { PlayService } from '../services/play.service';
import { InstanceManager } from '../util/instance-manager';

export class PlayController {

   public path = '/play';
   public router = Router();

   private playService: PlayService;

   constructor() {
      this.playService = InstanceManager.get(PlayService);

      this.router.use(InstanceManager.get(AuthenticateUserMiddleware).use)

      this.router.get(`${this.path}`, this.getCurrentScene);
      this.router.post(`${this.path}`, this.makeChoice)
   }

   /**
    * GET /play?characterId=:characterId
    */
   getCurrentScene = async (req: Request, res: Response) => {
      const characterId = req.query['characterId'] as string;
      
      res.send(await this.playService.getCurrentScene(req.user.id, parseInt(characterId)));
   }

   /**
    * POST /play
    */
   makeChoice = async (req: Request, res: Response) => {
      const { characterId, choiceId } = req.body;

      res.send(await this.playService.makeChoice(req.user.id, parseInt(characterId), parseInt(choiceId)));
   }

}