import { Request, RequestHandler, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SceneService } from '../services/scene.service';
import { ChoiceService } from '../services/choice.service';
import { StoryService } from '../services/story.service';
import { InstanceManager } from '../util/instance-manager';

export class EraseController {

   public path = '/erase';
   public router = Router();

   private storyService: StoryService;
   private sceneService: SceneService;
   private choiceService: ChoiceService;

   constructor(
      middlewares?: RequestHandler[],
   ) {
      this.storyService = InstanceManager.get(StoryService);
      this.sceneService = InstanceManager.get(SceneService);
      this.choiceService = InstanceManager.get(ChoiceService);

      if (middlewares) middlewares.forEach(mw => this.router.use(mw));

      this.router.delete(`${this.path}/choice`, this.deleteChoice);
      this.router.delete(`${this.path}/scene`, this.deleteScene);
   }

   /**
    * DELETE /erase/choice
    */
   deleteChoice = async (req: Request, res: Response) => {
      const { storyId, choiceId } = req.body;

      res.send(await this.choiceService.deleteChoice(
         req.user.id,
         parseInt(storyId),
         parseInt(choiceId)
      ));
   }

   /**
    * DELETE /erase/scene
    */
   deleteScene = async (req: Request, res: Response) => {
      const { storyId, sceneId } = req.body;

      res.send(await this.sceneService.deleteScene(
         req.user.id,
         parseInt(storyId),
         parseInt(sceneId)
      ));
   }


}