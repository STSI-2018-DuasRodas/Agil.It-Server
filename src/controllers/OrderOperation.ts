import { getRepository } from "typeorm";
import { OrderOperation } from "../models/maintenance-order/OrderOperation";
import { CrudController } from "./CrudController";

export class OrderOperationController extends CrudController<OrderOperation> {

  constructor() {
    super(getRepository(OrderOperation))
  }
  
}