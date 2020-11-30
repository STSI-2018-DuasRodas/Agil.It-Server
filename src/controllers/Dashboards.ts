import { OrderStatus } from './../models/enum/OrderStatus';
import { MaintenanceOrderController } from './MaintenanceOrder';
import { Request, Response, NextFunction } from "express";

export class DashboardsController {


  public async getAdminDashboard(request: Request, response: Response, next: NextFunction) {
    // route: [GET] dashboards/admin

    return new MaintenanceOrderController()
      .getRepositoryEntity()
      .createQueryBuilder('maintenanceOrder')
      .leftJoinAndSelect('maintenanceOrder.orderSignature', 'orderSignature', 'orderSignature.deleted = :orderSignatureDeleted', { orderSignatureDeleted: false })
      .leftJoinAndSelect('maintenanceOrder.orderLayout', 'orderLayout')
      .where('maintenanceOrder.deleted = :deleted', { deleted: false })
      .andWhere('maintenanceOrder.exported = :exported', { exported: false })
      .andWhere('maintenanceOrder.orderStatus in (:...statuses)', { statuses: [OrderStatus.SIGNATURED, OrderStatus.SIGNATURE_PENDING, OrderStatus.FINISHED] })
      .getMany();
  }

}