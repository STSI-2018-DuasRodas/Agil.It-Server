import { OrderStatus } from './../models/enum/OrderStatus';
import { MaintenanceOrderController } from './MaintenanceOrder';
import { Request, Response, NextFunction } from "express";

export class DashboardsController {


  public async getPendingOrders(request: Request, response: Response, next: NextFunction) {
    // route: [GET] dashboards/pending-orders

    const data = await new MaintenanceOrderController()
      .getRepositoryEntity()
      .createQueryBuilder('maintenanceOrder')
      .leftJoinAndSelect('maintenanceOrder.orderSignature', 'orderSignature', 'orderSignature.deleted = :orderSignatureDeleted', { orderSignatureDeleted: false })
      .leftJoinAndSelect('maintenanceOrder.orderEquipment', 'orderEquipment', 'orderEquipment.deleted = :orderEquipmentDeleted', { orderEquipmentDeleted: false })
      .leftJoinAndSelect('orderEquipment.orderOperation', 'orderOperation', 'orderOperation.deleted = :orderOperationDeleted', { orderOperationDeleted: false })
      .leftJoinAndSelect('maintenanceOrder.orderLayout', 'orderLayout')
      .where('maintenanceOrder.deleted = :deleted', { deleted: false })
      .andWhere('maintenanceOrder.exported = :exported', { exported: false })
      .andWhere('maintenanceOrder.orderStatus in (:...statuses)', { statuses: [OrderStatus.SIGNATURED, OrderStatus.SIGNATURE_PENDING, OrderStatus.FINISHED] })
      .getMany();

    return data.reduce((acc, maintenanceOrder) => {
      const { orderEquipment, ...data } = maintenanceOrder;
      const hasAlerts = orderEquipment.some(equipment => equipment.orderOperation.some(operation => operation.isDisapproved));

      acc.push({
        ...data,
        hasAlerts,
      });

      return acc;
    }, []);
  }
}