import { UserRole } from './../models/enum/UserRole';
import { getRepository, Not } from "typeorm";
import { User } from "../models/User";
import { CrudController } from "./CrudController";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import JWT from "../config/JWT";

export class UserController extends CrudController<User> {

  constructor() {
    super(getRepository(User))
  } 

  async login(request: Request, response: Response, next: NextFunction) {

    let { username, password } = request.body;
    if (!(username && password)) {
      throw 'Usuário ou senha não informado';
    }

    const user: User | undefined = await this.getRepositoryEntity()
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where(`user.name = '${username}'`)
    .orWhere(`user.email = '${username}'`)
    .orWhere(`user.employeeBadge = '${username}'`)
    .getOne()

    console.log('login -> ', user);

    if (!user) {
      throw 'Usuário inválido'
    }

    console.log('password -> ', password)
    console.log('user.password -> ', user.password)
    const validPassword = await this.validatePassword(password, user.password);
    if (!validPassword) throw 'Usuário inválido'

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

    return user;
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
      const result = await bcrypt.compare(password, savedPassword);
      console.log('validatePassword -> result -> ', result);
    } catch (err) {
      console.log('validatePassword -> err -> ', err);
    }

    return false;
  }

  public async createPasswordHash(password) {
    return bcrypt.hash(password, 10);
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

  public isCrypted(password: string): boolean {
    return (/\$2[a-zA-Z]{1}\$10\$/.test(password.substring(0,7)) && password.length === 60)
  }
}