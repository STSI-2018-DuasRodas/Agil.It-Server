import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { OrderEquipment } from '../models/maintenance-order/OrderEquipment';
import { CrudController } from './CrudController';
import { OrderOperationController } from './OrderOperation';

export class OrderEquipmentController extends CrudController<OrderEquipment> {

  constructor() {
    super(getRepository(OrderEquipment))
  }
  
  public async getEquipmentOperations(request: Request, response: Response, next: NextFunction) {
    // route: order-equipments/:orderEquipmentId/operations
  }

  public includes() {
    const orderOperation = new OrderOperationController();
    const includes = [
      'equipment',
      'superiorEquipment',
      'installationArea',
      ...this.addChildIncludes('orderEquipment', 'orderOperation', orderOperation.includes()),
    ]

    return includes;
  }

  public validateGetbyDescription() : boolean {
    return false;
  }
}