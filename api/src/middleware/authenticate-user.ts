import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export function authenticateUser(authService: AuthService) {
   return async (req: Request, res: Response, next: () => void) => {
      const authToken: string = req.headers['authorization'];
      if (!authToken) {
         res.status(401).send();
      }

      req.user = await authService.validate(authToken);
      next();
   }
}