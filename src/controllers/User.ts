import { getRepository } from "typeorm";
import { User } from "../models/User";
import { CrudController } from "./CrudController";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
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
          "password" : request.body.password,
          "deleted": false
        }
      });
    } catch (error) {
      return {"success":false,"error":"Usuário ou senha incorreto"};
    }

    //Sing JWT, valid for 5 hours
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        employeeBadge: user.employeeBadge
      },
      JWT.jwtSecret,
      { expiresIn: "5h" }
    );
    
    response.append('token', token);

    return {
      "success": true,
      "data": user
    };
  }

  async save(request: Request, response: Response, next: NextFunction) {

    let entity: User = this.getRepositoryEntity().create(<User>request.body)

    const token = <string>request.headers["token"];
    this.updateFields(token, entity);

    //Validade if the parameters are ok
    const error = await this.validate(entity)
    if (error !== undefined) {
      return {
        success: false,
        error: error
      }
    }

    if (entity["integrationID"] != "") {
      try {
        await this.getRepositoryEntity().findOneOrFail({ where: { integrationID: entity["integration"] } });
        return { "success": false, "error": `Registro com o integrationID ${entity["integrationID"]} já existe.` };
      } catch (error) {
        // Não está duplicado
      }
    }

    return this.getRepositoryEntity().save(entity);
  }

  public includes() {
    return ["workCenter","sector"]
  }
}