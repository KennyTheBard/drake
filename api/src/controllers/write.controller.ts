import { Request, RequestHandler, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SceneService } from '../services/scene.service';
import { ChoiceService } from '../services/choice.service';
import { StoryService } from '../services/story.service';
import { InstanceManager } from '../util/instance-manager';

export class WriteController {

   public path = '/write';
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

      this.router.post(`${this.path}/story`, this.createStory);
      this.router.put(`${this.path}/start`, this.setStartingScene);
      this.router.post(`${this.path}/scene`, this.createScene);
      this.router.put(`${this.path}/end`, this.markEndingScene);
      this.router.post(`${this.path}/choice`, this.createChoice);
   }

   createStory = async (req: Request, res: Response) => {
      const { title, description } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.storyService.createStory({
            authorId: req.user.id,
            title: title as string,
            description: description as string
         }));
   }

   setStartingScene = async (req: Request, res: Response) => {
      const { storyId, sceneId } = req.body;

      if (await this.storyService.setStartingScene({
         authorId: req.user.id,
         storyId: parseInt(storyId),
         startingSceneId: parseInt(sceneId)
      }) === 0) {
         res.status(StatusCodes.NOT_FOUND).send();
      }

      res.status(StatusCodes.OK).send();
   }

   createScene = async (req: Request, res: Response) => {
      const { storyId, choiceId, text } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.sceneService.createScene({
            authorId: req.user.id,
            storyId: storyId,
            text: text,
            prevChoiceId: parseInt(choiceId) || undefined
         }));
   }

   markEndingScene = async (req: Request, res: Response) => {
      const { storyId, sceneId, ending } = req.body;

      res.send(await this.sceneService.markAsEnding({
         authorId: req.user.id,
         storyId,
         sceneId,
         ending
      }));
   }

   createChoice = async (req: Request, res: Response) => {
      const { storyId, sceneId, text } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.choiceService.createChoice({
            authorId: req.user.id,
            storyId,
            sceneId,
            text
         }));
   }

}