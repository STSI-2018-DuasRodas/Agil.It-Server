import {getRepository} from "typeorm";
import {User} from "../models/User";
import {CrudController} from "./CrudController";
import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";

export class UserController extends CrudController<User> {

  constructor() {
    super(getRepository(User))
  } 

  async login(request: Request, response: Response, next: NextFunction) {

    let { username, password } = request.body;
    if (!(username && password)) {
      return {"success":false,"error":"Usuário ou senha não informado"};
    }

    let user: User;
    try {
      user = await this.getRepositoryEntity().findOneOrFail({
        where: {
          "email" : request.body.username,
          "password" : request.body.password
        }
      });
    } catch (error) {
      return {"success":false,"error":"Usuário ou senha incorreto"};
    }
    
    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      {
        userId: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        employeeBadge: user.getEmployeeBadge()
      },
      JWT.jwtSecret,
      { expiresIn: "5h" }
    );
    
    //Send the jwt in the response
    return {
      "success": true,
      "token": token,
      "user": user
    };
  }

}