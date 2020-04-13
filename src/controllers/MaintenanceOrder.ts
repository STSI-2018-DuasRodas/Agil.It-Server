import { getRepository, Repository, getConnection } from "typeorm";
import { MaintenanceOrder } from "../models/maintenance-order/MaintenanceOrder";
import {NextFunction, Request, Response} from "express";

export class MaintenanceOrderController {

  private repositoryEntity : Repository<MaintenanceOrder>;
  private connection = getConnection();

  constructor() {
    this.repositoryEntity = getRepository(MaintenanceOrder)
  }

	public getRepositoryEntity(): Repository<MaintenanceOrder> {
		return this.repositoryEntity;
  }

  public async getOrdersByMaintener(request: Request, response: Response, next: NextFunction) {
    let maintenerId=request.params.id

    return this.getRepositoryEntity().find({
      //relations: ["maintenanceWorker"],
      where: [
        { deleted: false },
        //{ "maintenanceWorker.userId": maintenerId }
      ]
    })

    // return await this.connection.query(`
    //   SELECT maintenance_order.* from maintenance_order
    //   INNER JOIN maintenance_worker ON (maintenance_worker.maintenanceOrderId = maintenance_order.id)
    //   WHERE maintenance_order.deleted = 0
    //     AND maintenance_worker.deleted = 0
    //     AND maintenance_worker.userId = ?
    // `,[maintenerId])
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