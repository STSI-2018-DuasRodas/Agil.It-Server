import { UserController } from "../controllers/User";
import { Collection } from "./Collection";
import { Route } from "./Route";
import { Method } from "./Method";

export class UserCollection extends Collection {
  constructor() {
    super('/users', UserController);
    this.addBaseCrudRoutes();
    this.addRoute(this.createLoginRoute())
  }

  private createLoginRoute(): Route {
    return new Route(
      Method.POST,
      `${this.baseRoute}/login`,
      this.getController(),
      'login',
      `Usuário ou senha inválidos`
    )
  }


}