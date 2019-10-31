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
    return this.getRepositoryEntity().find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.getRepositoryEntity().findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.getRepositoryEntity().save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let entityToRemove = await this.getRepositoryEntity().findOne(request.params.id);
    await this.getRepositoryEntity().remove(entityToRemove);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    let entity = await this.getRepositoryEntity().findOne(request.params.id);
    await this.getRepositoryEntity().update(entity,request.body);
  }
}