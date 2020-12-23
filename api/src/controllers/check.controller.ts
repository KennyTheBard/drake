import { Request, RequestHandler, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InstanceManager } from '../util/instance-manager';
import { CheckService } from '../services/check.service';

export class CheckController {

   public path = '/check';
   public router = Router();

   private checkService: CheckService;

   constructor(
      middlewares?: RequestHandler[],
   ) {
      this.checkService = InstanceManager.get(CheckService);

      if (middlewares) middlewares.forEach(mw => this.router.use(mw));

      // TODO: rewrite deadends as scenes 
      this.router.get(`${this.path}/:storyId/deadend`, this.checkForDeadends);
      this.router.get(`${this.path}/:storyId/dangling`, this.checkForDanglings);
      this.router.get(`${this.path}/:storyId/fake-endings`, this.checkForFakeEndings);
      this.router.get(`${this.path}/:storyId/unreachable`, this.checkForUnreachable);
   }

   checkForDeadends = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForDeadends({
         authorId: req.user.id,
         storyId
      }));
   }

   checkForDanglings = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForDanglings({
         authorId: req.user.id,
         storyId
      }));
   }

   checkForFakeEndings = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForFakeEndings({
         authorId: req.user.id,
         storyId
      }));
   }

   checkForUnreachable = async (req: Request, res: Response) => {
      const storyId = parseInt(req.params['storyId'] as string);

      res.send(await this.checkService.checkForUnreachable({
         authorId: req.user.id,
         storyId
      }));
   }

}