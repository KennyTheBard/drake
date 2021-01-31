import { Request, RequestHandler, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SceneService } from '../services/scene.service';
import { ChoiceService } from '../services/choice.service';
import { StoryService } from '../services/story.service';
import { InstanceManager } from '../util/instance-manager';
import { AuthenticateUserMiddleware } from '../middleware/authenticate-user';

export class WriteController {

   public path = '/write';
   public router = Router();

   private storyService: StoryService;
   private sceneService: SceneService;
   private choiceService: ChoiceService;

   constructor() {
      this.storyService = InstanceManager.get(StoryService);
      this.sceneService = InstanceManager.get(SceneService);
      this.choiceService = InstanceManager.get(ChoiceService);

      this.router.use(InstanceManager.get(AuthenticateUserMiddleware).use)

      this.router.post(`${this.path}/story`, this.createStory);
      this.router.put(`${this.path}/start`, this.setStartingScene);
      this.router.post(`${this.path}/scene`, this.createScene);
      this.router.put(`${this.path}/end`, this.markEndingScene);
      this.router.post(`${this.path}/choice`, this.createChoice);
      this.router.put(`${this.path}/bind/option`, this.bindSceneToChoice)
      this.router.put(`${this.path}/bind/next`, this.bindChoiceToScene)
   }

   /**
    * POST /write/story
    */
   createStory = async (req: Request, res: Response) => {
      const { title, description } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.storyService.createStory({
            authorId: req.user.id,
            title: title as string,
            description: description as string
         }));
   }

   /**
    * PUT /write/start
    */
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

   /**
    * POST /write/scene
    */
   createScene = async (req: Request, res: Response) => {
      const { storyId, choiceId, text, isEnding } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.sceneService.createScene({
            authorId: req.user.id,
            storyId: parseInt(storyId),
            text: text,
            prevChoiceId: parseInt(choiceId),
            isEnding: isEnding || false
         }));
   }

   /**
    * PUT /write/end
    */
   markEndingScene = async (req: Request, res: Response) => {
      const { storyId, sceneId, isEnding } = req.body;

      res.send(await this.sceneService.markAsEnding({
         authorId: req.user.id,
         storyId: parseInt(storyId),
         sceneId: parseInt(sceneId),
         isEnding
      }));
   }

   /**
    * POST /write/choice
    */
   createChoice = async (req: Request, res: Response) => {
      const { storyId, sceneId, text } = req.body;

      res.status(StatusCodes.CREATED)
         .send(await this.choiceService.createChoice({
            authorId: req.user.id,
            storyId: parseInt(storyId),
            sceneId: parseInt(sceneId),
            text
         }));
   }

   /**
    * PUT /write/option
    */
   bindSceneToChoice = async (req: Request, res: Response) => {
      const { storyId, prevSceneId, choiceId } = req.body;

      await this.choiceService.bindAsOption({
         authorId: req.user.id,
         storyId: parseInt(storyId),
         prevSceneId: parseInt(prevSceneId),
         choiceId: parseInt(choiceId)
      });

      res.send();
   }
 
   /**
    * PUT /write/next
    */
   bindChoiceToScene = async (req: Request, res: Response) => {
      const { storyId, nextSceneId, choiceId } = req.body;

      await this.sceneService.bindAsNext({
         authorId: req.user.id,
         storyId: parseInt(storyId),
         nextSceneId: parseInt(nextSceneId),
         choiceId: parseInt(choiceId)
      });

      res.send();
   }

}