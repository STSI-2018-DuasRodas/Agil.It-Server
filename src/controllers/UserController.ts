import {getRepository} from "typeorm";
import {User} from "../models/User";
import {CrudController} from "./CrudController";

export class UserController extends CrudController<User> {

  constructor() {
    super(getRepository(User))
  } 

}