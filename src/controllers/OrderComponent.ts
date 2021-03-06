import { getRepository } from "typeorm";
import { OrderComponent } from "../models/maintenance-order/OrderComponent";
import { CrudController } from "./CrudController";

export class OrderComponentController extends CrudController<OrderComponent> {

  constructor() {
    super(getRepository(OrderComponent))
  }

  public includes() {
    return ['item' ];
  }
  
  public validateGetbyDescription() : boolean {
    return false;
  }
}