import {NotificationController} from "../controllers/NotificationController";
import { Collection } from "./Collection";

export class NotificationCollection extends Collection {
    constructor() {
        super('/notifications', NotificationController);
        this.addBaseCrudRoutes();
    }
}