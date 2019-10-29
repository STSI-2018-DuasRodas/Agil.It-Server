import { Method } from "./Method";
import {Request, Response} from "express";

export class Route {

  private method: Method;
  private route: string;
  private controller: any;
  private action: string;

  constructor(method: Method, route: string, controller: any, action: string) {
    this.method = method
    this.route = route
    this.controller = controller
    this.action = action
  }

  public getMethod(): Method {
    return this.method;
  }

  public getRoute(): string {
    return this.route;
  }

  public getController(): any {
    return this.controller;
  }

  public getAction(): string {
    return this.action;
  }

  public setMethod(value: Method) {
    this.method = value;
  }

  public setRoute(value: string) {
    this.route = value;
  }

  public setController(value: any) {
    this.controller = value;
  }

  public setAction(value: string) {
    this.action = value;
  }

  public registerRoute(app:any, logRoutes: boolean = false) {
    app[this.getMethod()](this.getRoute(), (req: Request, res: Response, next: Function) => {

      const result = (new (this.getController() as any))[this.getAction()](req, res, next);

      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
    
    if (logRoutes) {
      console.log(`Registering route:\t${this.getMethod()}\t${this.getRoute()}`)
    }
  }

}