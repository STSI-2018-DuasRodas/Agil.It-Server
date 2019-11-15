import { getRepository, Repository } from "typeorm";
import { MaintenanceOrder } from "../models/maintenance-order/MaintenanceOrder";

export class MaintenanceOrderController {

  private repositoryEntity : Repository<MaintenanceOrder>;

  constructor() {
  }

	public getRepositoryEntity(): Repository<MaintenanceOrder> {
		return this.repositoryEntity;
  }
  
  
}