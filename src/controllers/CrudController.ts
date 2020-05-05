import {Repository, Entity} from 'typeorm';
import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";
import { RequestType } from '../models/enum/RequestType';

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

    let description = request.body.description;
    let entity: Entity
    try {
      entity = await this.getRepositoryEntity().findOneOrFail({
        where: {
          deleted: false,
          description: description
        }
      })
      entity = this.getRepositoryEntity().merge(entity, request.body)
    } catch (error) {
      entity = this.getRepositoryEntity().create(<Entity>request.body)
    }

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
        await this.getRepositoryEntity().findOneOrFail({where: {integrationID: entity["integrationID"]}});
        return {"success":false,"error":`Registro com o integrationID ${entity["integrationID"]} já existe.`};
      } catch (error) {
        // Não está duplicado
      }
    }

    return this.getRepositoryEntity().save(entity);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    
    let entity: Entity

    try {
      entity = await this.getRepositoryEntity().findOneOrFail(request.params.id);
      entity = this.getRepositoryEntity().merge(entity, request.body)
    } catch (error) {
      return {"success":false,"error":`Registro ${request.params.id} não encontrado`};
    }

    const token = <string>request.headers["token"];
    this.updateFields(token, entity);

    const errors = await validate(entity);
    if (errors.length > 0) {
      return {
        "success":false,
        "error":errors
      };
    }

    let result = await this.getRepositoryEntity().update(request.params.id,entity)
    if (!result) return {"success":false,"error":"Erro ao executar a Query para atualizar o registro"}

    return await this.getRepositoryEntity().findOne(request.params.id);
  }
  
  async remove(request: Request, response: Response, next: NextFunction) {
    
    let entity: Entity

    try {
      entity = await this.getRepositoryEntity().findOneOrFail(request.params.id);
    } catch (error) {
      return {"success":false,"error":`Registro com o integrationID ${entity["integrationID"]} já existe.`};
    }

    if (entity["deleted"] === true) {
      return {"success":false,"error":`Registro ${request.params.id} já está excluído.`};
    }

    const token = <string>request.headers["token"];
    this.updateFields(token, entity);

    entity["deleted"] = true;
    const errors = await validate(entity);
    if (errors.length > 0) {
      return {
        "success":false,
        "error":errors
      };
    }

    let result = await this.getRepositoryEntity().update(request.params.id,entity)
    if (!result) return {"success":false,"error":"Erro ao executar a Query para atualizar o registro"}

    return await this.getRepositoryEntity().findOne(request.params.id);
  }

  updateFields(token:string, entity : Entity) {
    let jwtPayload = <any>jwt.verify(token, JWT.jwtSecret);
    const { userId } = jwtPayload;

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
        filterObject[keyProperty]=entries[key];
      }
    });

    return filterObject;
  }

  public includes() {
    return [];
  }
}