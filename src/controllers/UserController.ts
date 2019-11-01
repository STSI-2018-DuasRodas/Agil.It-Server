import {getRepository} from "typeorm";
import {User} from "../models/User";
import {CrudController} from "./CrudController";
import {NextFunction, Request, Response} from "express";

export class UserController extends CrudController<User> {

  constructor() {
    super(getRepository(User))
  } 

  async login(request: Request, response: Response, next: NextFunction) {
    return this.getRepositoryEntity().findOne({
      where: {
              "email" : request.body.username,
              "password" : request.body.password
      }
    });
  }

}