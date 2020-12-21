import express from 'express';

interface Controller {
   router: express.Router
}

export class App {
   public app: express.Application;
   public port: number;

   constructor(controllers: Controller[], port: number) {
      this.app = express();
      this.port = port;

      this.initializeMiddlewares();
      this.initializeControllers(controllers);

      this.app.use((err, req, res, next) => {
         console.error(err.stack)
         res.status(500).send('Server error!')
      });
   }

   private initializeMiddlewares() {
      this.app.use(express.json());
   }

   private initializeControllers(controllers: Controller[]) {
      controllers.forEach((controller) => {
         this.app.use('/api', controller.router);
      });
   }

   public listen() {
      this.app.listen(this.port, () => {
         console.log(`App listening on the port ${this.port}`);
      });
   }
}