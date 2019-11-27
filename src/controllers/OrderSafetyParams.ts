import { getRepository, Repository, createQueryBuilder, Brackets } from "typeorm";
import { MaintenanceOrder } from "../models/maintenance-order/MaintenanceOrder";
import { SecurityParam } from "../models/SecurityParam";
import {NextFunction, Request, Response} from "express";

export class OrderSafetyParamsController {

  private maintenanceRepository : Repository<MaintenanceOrder>;
  private safetyParamsRepository : Repository<SecurityParam>;

  constructor() {
    this.maintenanceRepository = getRepository(MaintenanceOrder)
    this.safetyParamsRepository = getRepository(SecurityParam)
  }

	public getMaintenanceRepository(): Repository<MaintenanceOrder> {
		return this.maintenanceRepository;
  }
  
	public getSafetyParamsRepository(): Repository<SecurityParam> {
		return this.safetyParamsRepository;
  }

  public async getOrderSafetyParams(request: Request, response: Response, next: NextFunction) {

    let maintenanceOrder = await this.getMaintenanceRepository().findOne(request.params.maintenanceOrderId);
    if (maintenanceOrder === null || maintenanceOrder === undefined) {
      return {
        success: false,
        error: `Ordem ${request.params.maintenanceOrderId} não encontrada.`
      }
    }

    //TODO IMPLEMENTAR LÓGICA

   return this.getSafetyParamsRepository()
    .createQueryBuilder("safetyParams")
    .where("safetyParams.deleted = :deleted", { deleted: false })
    .andWhere(new Brackets(qb => {
      qb.where("safetyParams.useAlways = :useAlways", { useAlways: true })
        //.orWhere("user.lastName = :lastName", { lastName: "Saw" })
    }))
    .orderBy("safetyParams.useAlways","DESC")
  }
  
}