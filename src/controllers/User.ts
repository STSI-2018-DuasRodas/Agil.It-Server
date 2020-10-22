import { NotificationStatus } from './../models/enum/NotificationStatus';
import { NotificationController } from './Notification';
import { UserRole } from './../models/enum/UserRole';
import { getRepository, Not } from 'typeorm';
import { User } from '../models/User';
import { CrudController } from './CrudController';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
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
      const user: User = await this.getUser({
        email: username,
        role: Not(UserRole.INTEGRATION),
      }, [
        'password', 'name', 'email', 'role', 'contact', 'birthDate', 'forceChangePassword', 'sector', 'workCenter', 'employeeBadge', 'gender', 'id', 'integrationID', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'deleted'
      ]);

      const validPassword = await this.validatePassword(password, user.password);
      if (!validPassword) throw 'Usuário inválido'

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
      const user = await this.getUser({ id: userId }, ['password']);
      if (await this.validatePassword(password, user.password))
        return 'Válido'

    } catch { }

    throw 'Senha inválida';
  }

  public async getUser(customWhere:Object, select?: Array<keyof User>): Promise<User> {
    return this.getRepositoryEntity().findOneOrFail({
      where: {
        deleted: false,
        ...(typeof customWhere === 'object' ? customWhere : {}),
      },
      select,
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
  
  /**
    @param { Entity } entity entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
  */
  public async preSave(entity: any, isInserting: boolean) {
    if (entity.password && !this.isCrypted(entity.password)) {
      entity.password = await this.createPasswordHash(entity.password);
    }

    return {};
  }

  public async getIntegrationUser(username, password): Promise<User> {
    const user: User | undefined = await this.getRepositoryEntity()
    .createQueryBuilder('user')
    .addSelect('password')
    .where(`user.name = '${username}'`)
    .andWhere(`user.role = 'integration'`)
    .getOne()

    console.log('getIntegrationUser -> ', user);
    if (!user) throw new Error(`Usuário inválido`)

    const validPassword = await this.validatePassword(password, user.password);
    if (!validPassword) throw new Error(`Usuário inválido`)

    return user;
  }

  public async validatePassword(password, savedPassword): Promise<boolean> {
    try {
      return (await bcrypt.compare(password, savedPassword));
    } catch (err) {
      return false;
    }
  }

  public async createPasswordHash(password) {
    return bcrypt.hash(password, 10);
  }

  public includes() {
    return ['workCenter', 'sector']
  }
  public getCustomWheresList() {
    return {
      role: Not(UserRole.INTEGRATION)
    };
  }

  public validateGetbyDescription() {
    return false;
  }

  public isCrypted(password: string): boolean {
    return (/\$2[a-zA-Z]{1}\$10\$/.test(password.substring(0,7)) && password.length === 60)
  }
}