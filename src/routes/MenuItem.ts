import {MenuItemController} from "../controllers/MenuItemController";
import { Collection } from "./Collection";

export class MenuItemCollection extends Collection {
    constructor() {
        super('/menuItems', MenuItemController);
        this.addBaseCrudRoutes();
    }
}