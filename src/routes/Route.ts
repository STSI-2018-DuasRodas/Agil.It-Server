import { Method } from "./Method";
import { ResponseAPI } from "../ResponseAPI";
import { Request, Response } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { nextCallback } from "../middlewares/nextCallback";

export class Route {

  private method: Method | Array<Method>;
  private route: string;
  private controller: any;
  private action: string;
  private errorMessage: any;

  constructor(method: Method | Array<Method>, route: string, controller: any, action: string, errorMessage: any = `Registro não encontrado`) {
    this.method = method
    this.route = route
    this.controller = controller
    this.action = action
    this.errorMessage = errorMessage
  }

  public getMethod(): Method | Array<Method> {
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

  public setMethod(value: Method | Array<Method>) {
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

  public getErrorMessage(): any {
    return this.errorMessage;
  }

  public setErrorMessage(value: any) {
    this.errorMessage = value;
  }

  public registerRoute(app: any, logResponses: boolean = true) {
    let metedos = this.getMethod()
    if (typeof metedos == "string") {
      metedos = [metedos]
    }
    metedos.forEach(metodo => {
      (app as any)[metodo](this.getRoute(), [this.getRoute().split("/")[3] !== "login" ? checkJwt : nextCallback], (req: Request, res: Response, next: Function) => {

        const result = (new (this.getController() as any))[this.getAction()](req, res, next);

        if (result instanceof Promise) {
          result.then(result => {
            if (result !== null && result !== undefined) {
              res.status(200).json(ResponseAPI.getResponseObject(true, result))
              if (logResponses) {
                console.log(ResponseAPI.getResponseObject(true, result))
              }
            } else {
              res.status(400).json(ResponseAPI.getResponseObject(false, this.getErrorMessage()))
              if (logResponses) {
                console.log(ResponseAPI.getResponseObject(false, this.getErrorMessage()))
              }
            }
          })
          .catch(err => {
            res.status(400).json({ success: false, error: err})
            if (logResponses) {
              console.log("error => ", { success: false, error: err})
            }
          })
        } else if (result !== null && result !== undefined) {
          if (logResponses) {
            console.log(ResponseAPI.getResponseObject(true, result))
          }
          res.status(200).json(result);
        } else {
          if (logResponses) {
            console.log(ResponseAPI.getResponseObject(false, this.getErrorMessage()))
          }
          res.status(500).json({
            success: false,
            error: 'Erro inesperado'
          });
        }
      });
      console.log(`Registering route:${this.alignRight(metodo, 10)}\t${this.getRoute()}`)
    });
  }

  public alignRight(text: string, qtdCharacters: number = 15) {
    let textLength = text.length
    let repeatTimes = (qtdCharacters - textLength) > 0 ? (qtdCharacters - textLength) : 0

    return `${" ".repeat(repeatTimes)}${text}`
  }
}