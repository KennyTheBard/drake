import { Request, RequestHandler, Response, Router } from 'express';
import { AuthService } from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { InstanceManager } from '../util/instance-manager';

export class AuthController {

   public path = '/auth';
   public router = Router();

   private authService: AuthService;

   constructor(
      middlewares?: RequestHandler[],
   ) {
      this.authService = InstanceManager.get(AuthService);

      if (middlewares) middlewares.forEach(mw => this.router.use(mw));

      this.router.post(`${this.path}/register`, this.register)
      this.router.post(`${this.path}/login`, this.login)
   }

   /**
    * POST /auth/register
    */
   register = async (req: Request, res: Response) => {
      try {
         await this.authService.register(req.body.username, req.body.password);
         res.status(StatusCodes.CREATED).send();
      } catch (err) {
         res.status(401).send(err.message);
      }
   }

   /**
    * POST /auth/login
    */
   login = async (req: Request, res: Response) => {
      try {
         res.send(await this.authService.login(req.body.username, req.body.password))
      } catch (err) {
         res.status(401).send(err.message);
      }
   }
}