import {Repository} from 'typeorm';
import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";

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
    return this.getRepositoryEntity().find({ where: { deleted: false}});
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.getRepositoryEntity().findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    let entity: Entity = this.getRepositoryEntity().create(<Entity>request.body)

    const token = <string>request.headers["token"];
    this.updateFields(token, entity);

    console.log('recieved: ',entity)
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
        await this.getRepositoryEntity().findOneOrFail({where: {integrationID: entity["getIntegrationID"]()}});
        return {"success":false,"error":`Registro com o integrationID ${entity["getIntegrationID"]()} já existe.`};
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
      entity = await this.getRepositoryEntity().merge(entity, request.body)
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
      return {"success":false,"error":`Registro com o integrationID ${entity["getIntegrationID"]()} já existe.`};
    }

    if (entity["getDeleted"]() === true) {
      return {"success":false,"error":`Registro ${request.params.id} já está excluído.`};
    }

    const token = <string>request.headers["token"];
    this.updateFields(token, entity);

    entity["setDeleted"](true);
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

    entity["setUpdatedBy"](userId);
    if (entity["getCreatedBy"]() === undefined) {
      entity["setCreatedBy"](userId);
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
}