import { Request, RequestHandler, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SceneService } from '../services/scene.service';
import { ChoiceService } from '../services/choice.service';
import { StoryService } from '../services/story.service';

export class WriteController {

   public path = '/write';
   public router = Router();

   constructor(
      authenticateUser: RequestHandler,
      private readonly stroyService: StoryService,
      private readonly sceneService: SceneService,
      private readonly choiceService: ChoiceService
   ) {
      this.router.use(authenticateUser);
      this.router.post(`${this.path}/story`, this.createStory);
      this.router.post(`${this.path}/scene`, this.createScene);
      this.router.post(`${this.path}/choice`, this.createChoice);
   }

   createStory = async (req: Request, res: Response) => {
      const { text, description } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.stroyService.createStory(req.user.id, text, description));
   }

   createScene = async (req: Request, res: Response) => {
      const { choiceId, text } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.sceneService.createScene(parseInt(choiceId), text));
   }

   createChoice = async (req: Request, res: Response) => {
      const { sceneId, text } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.choiceService.createChoice(parseInt(sceneId), text));
   }

}