import { Request, RequestHandler, Response, Router } from 'express';
import { SceneService } from '../services/scene.service';
import { ChoiceService } from '../services/choice.service';
import { StoryService } from '../services/story.service';
import { InstanceManager } from '../util/instance-manager';
import { AuthenticateUserMiddleware } from '../middleware/authenticate-user';

export class ReadController {

   public path = '/read';
   public router = Router();

   private storyService: StoryService;
   private sceneService: SceneService;
   private choiceService: ChoiceService;

   constructor() {
      this.storyService = InstanceManager.get(StoryService);
      this.sceneService = InstanceManager.get(SceneService);
      this.choiceService = InstanceManager.get(ChoiceService);

      this.router.use(InstanceManager.get(AuthenticateUserMiddleware).use)

      this.router.get(`${this.path}/story/:storyId/scene/:sceneId`, this.getScene);
      this.router.get(`${this.path}/story/:storyId/scene`, this.getAllScenes);
      this.router.get(`${this.path}/story/:storyId/choice/:choiceId`, this.getChoice);
      this.router.get(`${this.path}/story/:storyId/choice`, this.getAllChoices);
      this.router.get(`${this.path}/story/:storyId/start`, this.getStartingScene);
      this.router.get(`${this.path}/story/:storyId`, this.getStory);
      this.router.get(`${this.path}/story`, this.getAllStories);
   }

   /**
    * GET /read/story
    */
   getAllStories = async (req: Request, res: Response) => {
      res.send(await this.storyService.getAllStories(req.user.id));
   }

   /**
    * GET /read/story/:storyId
    */
   getStory = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.storyService.getStory(req.user.id, storyId));
   }

   /**
    * GET /read/story/:storyId/start
    */
   getStartingScene = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.storyService.getStartingScene({
         authorId: req.user.id,
         storyId
      }));
   }

   /**
    * GET /read/story/:storyId/scene
    */
   getAllScenes = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.sceneService.getAllScenes(req.user.id, storyId));
   }

   /**
    * GET /read/story/:storyId/scene/:sceneId
    */
   getScene = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);
      const sceneId = parseInt(req.params['sceneId'] as string);

      res.send(await this.sceneService.getScene(req.user.id, storyId, sceneId));
   }

   /**
    * GET /read/story/:storyId/choice
    */
   getAllChoices = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.choiceService.getAllChoices({
         authorId: req.user.id,
         storyId
      }));
   }

   /**
    * GET /read/story/:storyId/choice/:choiceId
    */
   getChoice = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);
      const choiceId = parseInt(req.params['choiceId'] as string);

      res.send((await this.choiceService.getChoice(req.user.id, storyId, choiceId)) || {});
   }


}