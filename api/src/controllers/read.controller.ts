import { Request, RequestHandler, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SceneService } from '../services/scene.service';
import { ChoiceService } from '../services/choice.service';
import { StoryService } from '../services/story.service';
import { InstanceManager } from '../util/instance-manager';

export class ReadController {

   public path = '/read';
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

      this.router.get(`${this.path}/story/:storyId/scene/:sceneId`, this.getScene);
      this.router.get(`${this.path}/story/:storyId/scene`, this.getAllScenes);
      this.router.get(`${this.path}/story/:storyId`, this.getStory);
      this.router.get(`${this.path}/story`, this.getAllStories);
   }

   getStory = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.storyService.getStory(req.user.id, storyId));
   }

   getAllStories = async (req: Request, res: Response) => {
      res.send(await this.storyService.getAllStories(req.user.id));
   }

   getScene = async (req: Request, res: Response) => {
      console.log(req.params)
      const storyId = parseInt(req.params['storyId'] as string);
      const sceneId = parseInt(req.params['sceneId'] as string);

      res.send(await this.sceneService.getScene(req.user.id, storyId, sceneId));
   }

   getAllScenes = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.sceneService.getAllScenes(req.user.id, storyId));
   }

   // getChoice = async (req: Request, res: Response) => {
   //    const choiceId = parseInt(req.query['id'] as string);

   //    res.send(await this.choiceService.getChoice(req.user.id, choiceId));
   // }

   // getAllChoices = async (req: Request, res: Response) => {
   //    res.send(await this.choiceService.getAllChoices(req.user.id));
   // }

}