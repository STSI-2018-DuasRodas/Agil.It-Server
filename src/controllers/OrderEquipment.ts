import { getRepository } from "typeorm";
import { OrderEquipment } from "../models/maintenance-order/OrderEquipment";
import { CrudController } from "./CrudController";

export class OrderEquipmentController extends CrudController<OrderEquipment> {

  constructor() {
    super(getRepository(OrderEquipment))
  }
  
}