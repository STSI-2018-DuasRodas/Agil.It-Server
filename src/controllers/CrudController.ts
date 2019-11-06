import {Repository} from 'typeorm';
import {NextFunction, Request, Response} from "express";

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
    return this.getRepositoryEntity().save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let result = await this.getRepositoryEntity().update(request.params.id,<any>{deleted:true})
    if (!result) return {"success":false,"error":"Erro ao executar a Query para atualizar o registro"}

    return await this.getRepositoryEntity().findOne(request.params.id);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    
    let result = await this.getRepositoryEntity().update(request.params.id,request.body)
    if (!result) return {"success":false,"error":"Erro ao executar a Query para atualizar o registro"}

    return await this.getRepositoryEntity().findOne(request.params.id);
  }
}