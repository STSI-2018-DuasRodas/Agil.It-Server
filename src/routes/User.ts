import {UserController} from "../controllers/UserController";
import { Collection } from "./Collection";

export class UserCollection extends Collection {
    constructor() {
        super('/users', UserController);
        this.addBaseCrudRoutes();
    }
}