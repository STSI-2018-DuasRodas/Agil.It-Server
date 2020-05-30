import { getRepository } from "typeorm";
import { OrderSignature } from "../models/maintenance-order/OrderSignature";
import { CrudController } from "./CrudController";

export class OrderSignatureController extends CrudController<OrderSignature> {

  constructor() {
    super(getRepository(OrderSignature))
  }
  
  public includes() {
    return [
      'user',
      'maintenanceOrder',
    ]
  }
  
  public validateGetbyDescription() : boolean {
    return false;
  }
}