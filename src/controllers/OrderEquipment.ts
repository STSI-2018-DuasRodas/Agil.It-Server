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
      'equipment.machineType',      
      'superiorEquipment',
      'installationArea',
      ...this.addChildIncludes('orderEquipment', 'orderOperation', orderOperation.includes()),
    ]

    return includes;
  }

  public validateGetbyDescription() : boolean {
    return false;
  }
  
  /**
    @param { OrderEquipment } orderEquipment entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
  */
  public async preSave(orderEquipment: any, isInserting: boolean) {
    const { orderOperation } = orderEquipment;

    delete orderEquipment['orderOperation'];

    return { orderOperation };
  }

  /**
    @param { OrderEquipment } orderEquipment entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
    @param { any } preSave retorno do método preSave
  */
  public async posSave(orderEquipment: any, isInserting: boolean, preSave: any) {
    const { orderOperation } = preSave;

    if(Array.isArray(orderOperation)) {
      const controller = new OrderOperationController();
      const userId = orderEquipment['updatedBy'];

      for (let i = 0; i < orderOperation.length; i++) {
        const obj = orderOperation[i];
        
        if (typeof obj !== 'object' || obj === null) continue

        obj['updatedBy'] = userId;
        if (obj['createdBy'] === undefined) {
          obj['createdBy'] = userId;
        }

        obj['orderEquipment'] = orderEquipment;

        await controller.saveEntity(obj);
      }
    }
  }

  /**
    @param { OrderEquipment } orderEquipment entidade que está sendo deletado
  */
  public async preDelete(orderEquipment: any) {
    delete orderEquipment['orderOperation'];
    return {};
  }
}