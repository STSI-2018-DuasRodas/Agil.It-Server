import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as helmet from "helmet";
import {Routes} from "./routes";
import { Collection } from "./routes/Collection";
import { Route } from "./routes/Route";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(helmet());

    let routes = new Routes();

    routes.getCollections().forEach((collection: Collection) => {
        collection.getRoutes().forEach((route: Route) => {
          route.registerRoute(app)
        });
    })

    app.listen(3000);

}).catch(error => console.log(error));
