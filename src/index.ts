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

createConnection().then(async connection => {

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

    /*
    let userController = new UserController()
    console.log(userController.getRepositoryEntity().save(<User><unknown>{
      "id": 1,  
      "name": "Julio",
      "email": "julio",
      "password": "julio123",
      "role": "maintainer",
      "birthDate": "1977-06-03 22:16:46",
      "contact": "4733707700",
      "forceChangePassword": false,
      "employeeBadge": 1234,
      "gender": "male",
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "1977-06-03 22:16:46",
      "updatedAt": "1977-06-03 22:16:46"
    }))
    */

}).catch(error => console.log(error));
