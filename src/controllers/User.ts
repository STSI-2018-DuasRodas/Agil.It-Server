import { NotificationStatus } from './../models/enum/NotificationStatus';
import { NotificationController } from './Notification';
import { UserRole } from './../models/enum/UserRole';
import { getRepository, Not, createQueryBuilder } from "typeorm";
import { User } from "../models/User";
import { CrudController } from "./CrudController";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";

export class UserController extends CrudController<User> {

  constructor() {
    super(getRepository(User))
  } 

  async login(request: Request, response: Response, next: NextFunction) {

    let { username, password } = request.body;
    if (!(username && password)) {
      throw "Usuário ou senha não informado";
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

      if (user.role === UserRole.INTEGRATION) throw 'Usuário inválido'
    } catch (error) {
      throw 'Usuário ou senha incorreto';
    }

    //Sing JWT, valid for 5 hours
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        employeeBadge: user.employeeBadge,
        role: user.role,
      },
      JWT.jwtSecret,
      { expiresIn: "5h" }
    );
    
    response.append('token', token);

    return user;
  }

  async getUserNotificationsRequest(request: Request, response: Response, next: NextFunction) {
    const userId = request.params.id;

    return this.getUserNotifications(userId);
  }

  async getUserNotifications(userId) {
    return new NotificationController()
      .getRepositoryEntity()
      .createQueryBuilder('notification')
      .where('notification.deleted = :deleted', { deleted: false })
      .andWhere('notification.user = :userId', { userId })
      .andWhere('notification.status in (:...statuses)', { statuses: [NotificationStatus.NEW, NotificationStatus.VIEWED] })
      .orderBy('notification.createdAt', 'ASC')
      .getMany();
  }

  public includes() {
    return ["workCenter","sector"]
  }
  public getCustomWheresList() {
    return {
      role: Not(UserRole.INTEGRATION)
    };
  }

  public validateGetbyDescription() {
    return false;
  }
}