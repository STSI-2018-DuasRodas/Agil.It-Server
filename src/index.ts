import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as helmet from "helmet";
import {Routes} from "./routes";
import { Collection } from "./routes/Collection";
import { Route } from "./routes/Route";
import { UserController } from "./controllers/User";
import { User } from "./models/User";
import { Seeder } from './seeds/Seeder'

createConnection().then(async connection => {

  // Execute Mock
  await Seeder.Executar()

  // create express app
  const app = express();
  app.use(bodyParser.json());
  app.use(cors({exposedHeaders: 'token'}));
  app.use(helmet());

  let routes = new Routes();

  routes.getCollections().forEach((collection: Collection) => {
      collection.getRoutes().forEach((route: Route) => {
        route.registerRoute(app)
      });
  })

  app.listen(4000);

}).catch(error => console.log(error));
