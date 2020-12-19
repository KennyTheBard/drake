import { Request, Response, Router } from 'express';
import { AuthService } from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';

export class AuthController {

   public path = '/auth';
   public router = Router();

   constructor(
      private readonly authService: AuthService
   ) {
      this.router.post(`${this.path}/register`, this.register)
      this.router.post(`${this.path}/login`, this.login)
   }

   register = async (req: Request, res: Response) => {
      await this.authService.register(req.body.username, req.body.password)
      res.status(StatusCodes.CREATED).send();
   }

   login = async (req: Request, res: Response) => {
      res.send(await this.authService.login(req.body.username, req.body.password))
   }
}