import { UserRole } from './../models/enum/UserRole';
import {Repository, Not, Between } from 'typeorm';
import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";
import { getIntegrionUser } from '../middlewares/checkJwt';
import { User } from '../models/User';
import { v4 as uuid } from 'uuid';

export class CrudController<Entity> {

  private repositoryEntity : Repository<Entity>;

  constructor(repositoryEntity: Repository<Entity>) {
    this.repositoryEntity = repositoryEntity;
  }

  /**
   * Getter repositoryEntity
   * @return {Repository<Entity>}
   */
	public getRepositoryEntity(): Repository<Entity> {
		return this.repositoryEntity;
	}

  /**
   * Setter repositoryEntity
   * @param {Repository<Entity>} value
   */
	public setRepositoryEntity(value: Repository<Entity>) {
		this.repositoryEntity = value;
	}


  async all(request: Request, response: Response, next: NextFunction) {
    
    const where = {
      deleted: false,
      ...this.getWhereConditions(request.params, request.query, this.getRepositoryEntity().create()),
      ...this.getCustomWheresList(),
    }
    
    const { skip, take } = request.headers;

    return this.getRepositoryEntity().find(<any>{
      relations: this.includes(),
      where,
      skip,
      take,
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.getRepositoryEntity().findOne(request.params.id, {
      relations: this.includes(),
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {

    let entity: Entity = await this.getEntityByDescription(request.body)

    const token = <string>request.headers["token"];
    const authorization = <string>request.headers["authorization"];

    await this.updateFields(token, authorization, entity);

    return await this.saveEntity(entity)
  }

  async update(request: Request, response: Response, next: NextFunction) {
    
    let entity: Entity

    try {
      entity = await this.getRepositoryEntity().findOneOrFail(request.params.id, {
        relations: this.includes(),
      });
      entity = this.getRepositoryEntity().merge(entity, request.body)
    } catch (error) {
      throw `Registro ${request.params.id} não encontrado`;
    }

    const token = <string>request.headers["token"];
    const authorization = <string>request.headers["authorization"];

    await this.updateFields(token, authorization, entity);

    return await this.saveEntity(entity)
  }
  
  async saveEntity(entity: Entity) {

    //Validade if the parameters are ok
    const error = await this.validate(entity)
    if (error !== undefined) {
      throw error
    }

    const inserted: boolean = (typeof entity['id'] === 'number' || (typeof entity['id'] === 'string' && entity['id'].length > 0))
    const isInserting: boolean = !inserted

    if (entity['integrationID'] && entity['integrationID'] != '') {
      try {
        const integrationId = entity['integrationID'];
        const duplicated = await this.getRepositoryEntity().findOneOrFail({
          where: {
            integrationID: integrationId,
            deleted: false,
          }
        });

        if (isInserting || (inserted && duplicated['id'] != entity['id'])) {
          throw `Registro com o integrationID ${integrationId} já existe.`;
        }
      } catch (error) {
        if (typeof error === "string" && error.substr(0,28) === "Registro com o integrationID") {
          throw error;
        }
      }
    }

    const preSave = await this.preSave(entity, isInserting)

    const includes = this.includes()
    let entitySaved: Entity;

    entitySaved = await this.getRepositoryEntity().save(entity);
    await this.posSave(entitySaved, isInserting, preSave)

    if (includes.length > 0) {
      entitySaved = await this.getRepositoryEntity().findOne(entity["id"],{
        relations: includes,
      });
    }
    
    return entitySaved;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    
    let entity: Entity

    try {
      entity = await this.getRepositoryEntity().findOneOrFail(request.params.id, {
        relations: this.includes(),
      });
    } catch (error) {
      throw `Registro com o integrationID ${entity["integrationID"]} já existe.`;
    }

    if (entity["deleted"] === true) {
      throw `Registro ${request.params.id} já está excluído.`;
    }

    const token = <string>request.headers["token"];
    const authorization = <string>request.headers["authorization"];

    await this.updateFields(token, authorization, entity);

    return await this.removeEntity(entity);
  }
  
  async removeEntity(entity: Entity) {
    
    entity["deleted"] = true;
    
    if (entity['integrationID'] && entity['integrationID'] != '') {
      entity["integrationID"] = `${entity['integrationID']}-uuid-${uuid()}`;
    }

    const errors = await validate(entity);
    if (errors.length > 0) {
      throw errors;
    }

    const preDelete = await this.preDelete(entity)
    
    let result = await this.getRepositoryEntity().save(entity)
    if (!result) throw "Erro ao deletar o registro";

    await this.posDelete(entity, preDelete)
    
    return await this.getRepositoryEntity().findOne(entity['id']);
  }

  async updateFields(token:string, authorization:string, entity :Entity) {

    let userId;

    if (token) {
      let jwtPayload = <any>jwt.verify(token, JWT.jwtSecret);
      userId = jwtPayload.userId;
    } else {
      const userIntegration:User = await getIntegrionUser(authorization)
      userId = userIntegration.id;
    }

    entity["updatedBy"] = userId;
    if (entity["createdBy"] === undefined) {
      entity["createdBy"] = userId;
    }
  }

  async validate(entity: Entity) : Promise<any> {
    const errors = await validate(entity);

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

  public getWhereConditions(params: any = {}, query: any = {}, entity: any) {

    let filterObject = {};

    const entries = {
      ...query,
      ...params,
    };

    const keys = Object.keys(entries);

    keys.forEach(key => {

      let keyProperty = '';

      if(key.length > 2 && key.substr(key.length-2,2) == 'Id') {
        keyProperty=key.substr(0,key.length-2)
      } else {
        keyProperty=key
      }

      if (entity.hasOwnProperty(keyProperty)) {
        const value = entries[key];

        if (value.substring(0,7).toLowerCase() === 'between') {
          const values = value.replace(/\(\)/g).split(',')
          filterObject[keyProperty] = Between(values[0], values[1]);
        } else {
          filterObject[keyProperty] = value;
        }
      }
    });

    return filterObject;
  }

  public includes() {
    return [];
  }
  
  public addChildIncludes(parentName: string, childName: string, arrayChild: any = []): any {
    const arrayIncludes = [ childName ];

    arrayChild.forEach((childRelation: string) => {
      // Ignora a relação com o pai
      if (childRelation == parentName) {
        return
      }

      arrayIncludes.push(`${childName}.${childRelation}`)
    });

    return arrayIncludes;
  }

  public validateGetbyDescription() : boolean {
    return true;
  }

  public async getEntityByDescription(body: any): Promise<any> {
    let entity: Entity

    if (!this.validateGetbyDescription()) {
      return this.getRepositoryEntity().create(<Entity>body)
    }

    try {
      
      entity = await this.getRepositoryEntity().findOneOrFail({
        where: {
          deleted: false,
          description: body.description,
        }
      })
      entity = this.getRepositoryEntity().merge(entity, body)
    } catch (error) {
      entity = this.getRepositoryEntity().create(<Entity>body)
    }

    return entity;
  }
  
  public getCustomWheresList() {
    return {
      role: Not(UserRole.INTEGRATION),
    };
  }

  /**
    @param { Entity } entity entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
  */
  public async preSave(entity: any, isInserting: boolean) {
    return {};
  }
  
  
  /**
    @param { Entity } entity entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
    @param { any } preSave retorno do método preSave
  */
  public async posSave(entity: any, isInserting: boolean, preSave: any) {
    
  }
  
  
  /**
    @param { Entity } entity entidade que está sendo deletado
  */
  public async preDelete(entity: any) {
    return {};
  }
  
  /**
    @param { Entity } entity entidade que está sendo deletado
    @param { any } preDelete retorno do método preDelete
  */
  public async posDelete(entity: any, preDelete: any) {
    
  }
}