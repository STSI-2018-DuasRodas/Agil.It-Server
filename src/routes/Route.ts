import { Method } from "./Method";
import {Request, Response} from "express";

export class Route {

  private method: Method;
  private route: string;
  private controller: any;
  private action: string;
  private errorMessage: any;

  constructor(method: Method, route: string, controller: any, action: string, errorMessage: any = `Registro não encontrado`) {
    this.method = method
    this.route = route
    this.controller = controller
    this.action = action
    this.errorMessage = errorMessage
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
  
	public getErrorMessage(): any {
		return this.errorMessage;
	}

	public setErrorMessage(value: any) {
		this.errorMessage = value;
	}

}