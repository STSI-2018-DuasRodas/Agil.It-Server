import { getRepository, Repository } from "typeorm";
import { MaintenanceOrder } from "../models/maintenance-order/MaintenanceOrder";
import {NextFunction, Request, Response} from "express";

export class MaintenanceOrderController {

  private repositoryEntity : Repository<MaintenanceOrder>;

  constructor() {
    this.repositoryEntity = getRepository(MaintenanceOrder)
  }

	public getRepositoryEntity(): Repository<MaintenanceOrder> {
		return this.repositoryEntity;
  }

  public async getOrdersByMaintener(request: Request, response: Response, next: NextFunction) {
    let maintenerId=request.params.id

    return this.getRepositoryEntity().find({
      relations: ["maintenanceWorker"],
      where: [
        { deleted: false },
        { "maintenanceWorker.userId": maintenerId }
      ]
    })
  }

  public async getOrder(request: Request, response: Response, next: NextFunction) {

  }
  
  public async createOrder(request: Request, response: Response, next: NextFunction) {
    
  }
  
  public async updateOrder(request: Request, response: Response, next: NextFunction) {
    
  }
  
  public async deleteOrder(request: Request, response: Response, next: NextFunction) {
    
  }
}