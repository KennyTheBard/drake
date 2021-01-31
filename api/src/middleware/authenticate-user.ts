import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { InstanceManager } from '../util/instance-manager';

export class AuthenticateUserMiddleware {
   private authService: AuthService;

   constructor() {
      this.authService = InstanceManager.get(AuthService);
   };

   use = async (req: Request, res: Response, next: () => void) => {
      const authToken: string = req.headers['authorization'];
      if (!authToken) {
         res.status(401).send();
      }

      req.user = await this.authService.validate(authToken);
      next();
   }
}