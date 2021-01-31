import { Request, RequestHandler, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InstanceManager } from '../util/instance-manager';
import { CheckService } from '../services/check.service';
import { AuthenticateUserMiddleware } from '../middleware/authenticate-user';

export class CheckController {

   public path = '/check';
   public router = Router();

   private checkService: CheckService;

   constructor() {
      this.checkService = InstanceManager.get(CheckService);

      this.router.use(InstanceManager.get(AuthenticateUserMiddleware).use)

      // TODO: rewrite deadends as scenes 
      this.router.get(`${this.path}/:storyId/deadend`, this.checkForDeadends);
      this.router.get(`${this.path}/:storyId/dangling`, this.checkForDanglings);
      this.router.get(`${this.path}/:storyId/fake-ending`, this.checkForFakeEndings);
      this.router.get(`${this.path}/:storyId/unreachable`, this.checkForUnreachable);
      this.router.get(`${this.path}/:storyId/orphan`, this.checkForOrphan);
   }

   /**
    * GET /check/:storyId/deadend
    * 
    * Deadends are scenes without choices and not marked as endings
    */
   checkForDeadends = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForDeadends({
         authorId: req.user.id,
         storyId
      }));
   }

   /**
    * GET /check/:storyId/dangling
    * 
    * Danglings are choices without next scene
    */
   checkForDanglings = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForDanglings({
         authorId: req.user.id,
         storyId
      }));
   }

   /**
    * GET /check/:storyId/fake-ending
    * 
    * Fake endings are scenes marked as endings, but with choices
    */
   checkForFakeEndings = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForFakeEndings({
         authorId: req.user.id,
         storyId
      }));
   }

   /**
    * GET /check/:storyId/unreachable
    * 
    * Unreachable plots are scenes that cannot be reached from the starting scene
    */
   checkForUnreachable = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForUnreachable({
         authorId: req.user.id,
         storyId
      }));
   }

   /**
    * GET /check/:storyId/orphans
    * 
    * Orphans are choices that are not options for any scene
    */
   checkForOrphan = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForOrphan({
         authorId: req.user.id,
         storyId
      }));
   }

}