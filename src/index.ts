import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import * as cors from 'cors';
import {Routes} from "./routes";
import { Collection } from "./routes/Collection";
import { Route } from "./routes/Route";
import { ResponseAPI } from "./ResponseAPI";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    let routes = new Routes();

    routes.getCollections().forEach((collection: Collection) => {
        collection.getRoutes().forEach((route: Route) => {
            (app as any)[route.getMethod()](route.getRoute(), (req: Request, res: Response, next: Function) => {

                const result = (new (route.getController() as any))[route.getAction()](req, res, next);
          
                if (result instanceof Promise) {
                  result.then(result => {
                    if (result !== null && result !== undefined) {
                      res.status(200).json(ResponseAPI.getResponseObject(true,result))
                    } else {
                      res.status(200).json(ResponseAPI.getResponseObject(false,route.getErrorMessage()))
                    }
                  })
                  .catch((err)=> {
                    if (err !== null && err !== undefined) {
                      res.status(200).json(ResponseAPI.getResponseObject(true,err))
                    } else {
                      res.status(200).json(ResponseAPI.getResponseObject(false,route.getErrorMessage()))
                    }
                  })
                } else if (result !== null && result !== undefined) {
                  res.json(result);
                }
              });
              console.log(`Registering route:\t${route.getMethod()}\t${route.getRoute()}`)
        });
    })

    app.listen(3000);

}).catch(error => console.log(error));
