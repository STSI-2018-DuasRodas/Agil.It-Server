import { NotificationStatus } from './../models/enum/NotificationStatus';
import { NotificationController } from './Notification';
import { UserRole } from './../models/enum/UserRole';
import { getRepository, Not } from 'typeorm';
import { User } from '../models/User';
import { CrudController } from './CrudController';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import JWT from '../config/JWT';

export class UserController extends CrudController<User> {

  constructor() {
    super(getRepository(User))
  } 

  async login(request: Request, response: Response, next: NextFunction) {
    const { username, password } = request.body;

    if (!(username && password)) {
      throw 'Usuário ou senha não informado';
    }

    try {
      const user: User = await this.validateUser(password, {
        email: username,
        role: Not(UserRole.INTEGRATION),
      });

      response.append('token', this.generateJwtToken(user));
      return user;

    } catch (error) {
      throw 'Usuário ou senha incorreto';
    }
  }

  public generateJwtToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id || (<any>user).userId,
        email: user.email,
        name: user.name,
        employeeBadge: user.employeeBadge,
        role: user.role,
      },
      JWT.jwtSecret,
      { expiresIn: '5h' }
    );
  }

  async validateUserRequest(request: Request, response: Response, next: NextFunction) {
    const { userId } = <any>jwt.verify(<string>request.headers['token'], JWT.jwtSecret);
    const { password } = request.body;

    try {
      await this.validateUser(password, { id: userId });
      return 'Válido'
    } catch {
      throw 'Senha inválida';
    }
  }

  public async validateUser(password:string, customWhere:Object): Promise<User> {
    return this.getRepositoryEntity().findOneOrFail({
      where: {
        deleted: false,
        password,
        ...(typeof customWhere === 'object' ? customWhere : {}),
      }
    });
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
    return ['workCenter','sector']
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