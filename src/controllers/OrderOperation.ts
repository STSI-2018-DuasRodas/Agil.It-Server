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
  
}