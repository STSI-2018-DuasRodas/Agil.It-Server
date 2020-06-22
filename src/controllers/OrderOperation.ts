import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { OrderOperation } from "../models/maintenance-order/OrderOperation";
import { CrudController } from "./CrudController";
import { OrderComponentController } from "./OrderComponent";

export class OrderOperationController extends CrudController<OrderOperation> {

  constructor() {
    super(getRepository(OrderOperation))
  }

  public async getOperationComponents(request: Request, response: Response, next: NextFunction) {
    // route: order-operations/:orderOperationId/components
  }

  public includes() {
    const orderComponent = new OrderComponentController();
    const includes = [
      'orderEquipment',
      'defaultObservation',
      ...this.addChildIncludes('orderOperation', 'orderComponent', orderComponent.includes()),
    ]

    return includes;
  }

  public validateGetbyDescription() : boolean {
    return false;
  }
  
  
  /**
    @param { OrderOperation } orderOperation entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
  */
  public async preSave(orderOperation: any, isInserting: boolean) {
    const { orderComponent } = orderOperation;

    delete orderOperation['orderComponent'];

    return { orderComponent };
  }

  /**
    @param { OrderOperation } orderOperation entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
    @param { any } preSave retorno do método preSave
  */
  public async posSave(orderOperation: any, isInserting: boolean, preSave: any) {
    const { orderComponent } = preSave;

    if(Array.isArray(orderComponent)) {
      const controller = new OrderComponentController();
      const userId = orderOperation['updatedBy'];

      for (let i = 0; i < orderComponent.length; i++) {
        const obj = orderComponent[i];
        
        if (typeof obj !== 'object' || obj === null) continue

        obj['updatedBy'] = userId;
        if (obj['createdBy'] === undefined) {
          obj['createdBy'] = userId;
        }

        obj['orderOperation'] = orderOperation;

        await controller.saveEntity(obj)
      }
    }
  }

  /**
    @param { OrderOperation } orderOperation entidade que está sendo deletado
  */
  public async preDelete(orderOperation: any) {
    delete orderOperation['orderComponent'];
    return {};
  }
  
}