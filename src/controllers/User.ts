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
        userId: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        employeeBadge: user.getEmployeeBadge()
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

    console.log("TCL: CrudController<Entity> -> save -> request.body", request.body)

    let name = request.body.name
    let entity: User
    try {
      console.log("1");
      entity = await this.getRepositoryEntity().findOneOrFail({
        where: {
          deleted: false,
          name: name
        }
      })
      entity = await this.getRepositoryEntity().merge(entity, request.body)
      console.log("2");
    } catch (error) {
      console.log("3");
      entity = this.getRepositoryEntity().create(<User>request.body)
    }

    console.log("4");
    console.log("TCL: CrudController<Entity> -> save -> entity", entity["getIntegrationID"]())

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

    if (entity["getIntegrationID"]() != "") {
      try {
        await this.getRepositoryEntity().findOneOrFail({ where: { integrationID: entity["getIntegrationID"]() } });
        return { "success": false, "error": `Registro com o integrationID ${entity["getIntegrationID"]()} já existe.` };
      } catch (error) {
        // Não está duplicado
      }
    }

    return this.getRepositoryEntity().save(entity);
  }

  updateFields(token: string, user: User) {
    let jwtPayload = <any>jwt.verify(token, JWT.jwtSecret);
    const { userId } = jwtPayload;

    user["setUpdatedBy"](userId);
    if (user["getCreatedBy"]() === undefined) {
      user["setCreatedBy"](userId);
    }
  }

  async validate(user: User): Promise<any> {
    const errors = await validate(user);

    if (errors.length === 0) {
      return undefined
    }

    let errorList = []

    errors.forEach(error => {
      let constraints = error.constraints

      for (const key in constraints) {
        if (constraints.hasOwnProperty(key)) {
          errorList.push(constraints[key])
        }
      }
    });

    return errorList
  }

  public includes() {
    return ["workCenter","sector"]
  }
}