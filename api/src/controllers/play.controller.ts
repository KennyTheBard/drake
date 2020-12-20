import { SceneService } from '../services/scene.service';
import { Request, Response, Router } from 'express';

export class PlayController {

   public path = '/play';
   public router = Router();

   constructor(
      private readonly sceneService: SceneService
   ) {
      this.router.post(`${this.path}`, this.getCurrentScene)
   }

   getCurrentScene = async (req: Request, res: Response) => {
      const characterId = req.query['characterId'];
      if (typeof characterId !== 'string') {
         throw new Error('Wrong format for characterId');
      }
      res.send(await this.sceneService.getCurrentForCharacter(parseInt(characterId)));
   }

   makeChoice = async (req: Request, res: Response) => {
      const characterId = req.query['characterId'];
      if (typeof characterId !== 'string') {
         throw new Error('Wrong format for characterId');
      }
      res.send(await this.sceneService.getCurrentForCharacter(parseInt(characterId)));
   }

}