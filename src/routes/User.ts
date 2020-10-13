import { UserController } from "../controllers/User";
import { Collection } from "./Collection";
import { Route } from "./Route";
import { Method } from "./Method";

export class UserCollection extends Collection {
  constructor() {
    super('/users', UserController);
    this.addBaseCrudRoutes();
    this.loadRoutes()
    
  }

  private loadRoutes() :void {
    this.addRoute(new Route(
      Method.POST,
      `${this.baseRoute}/login`,
      this.getController(),
      'login',
      `Usuário ou senha inválidos`
    ))

    this.addRoute(new Route(
      Method.GET,
      `${this.getRouteWithId()}/notifications`,
      this.getController(),
      'getUserNotificationsRequest',
      `Usuário ou senha inválidos`
    ))
    
    this.addRoute(new Route(
      Method.POST,
      `${this.baseRoute}/validate-user`,
      this.getController(),
      'validateUserRequest',
      `Usuário inválido`
    ))
  }
}