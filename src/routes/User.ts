import {UserController} from "../controllers/UserController";
import { Collection } from "./Collection";
import { Route } from "./Route";
import { Method } from "./Method";

export class UserCollection extends Collection {
    constructor() {
        super('/users', UserController);
        this.addBaseCrudRoutes();
        this.addRoute(this.createLoginRoute())
    }

    private createLoginRoute() : Route {
        return new Route(
            Method.POST,
            `/login`,
            this.getController(),
            'login',
            `Usuário ou senha inválidos`
        )
    }

    
}