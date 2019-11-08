import { getRepository } from "typeorm";
import { Notification } from "../models/Notification";
import { CrudController } from "./CrudController";

export class NotificationController extends CrudController<Notification> {

  constructor() {
    super(getRepository(Notification))
  } 

}