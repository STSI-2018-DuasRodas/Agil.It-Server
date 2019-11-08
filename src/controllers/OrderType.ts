import { getRepository } from "typeorm";
import { OrderType } from "../models/OrderType";
import { CrudController } from "./CrudController";

export class OrderTypeController extends CrudController<OrderType> {

  constructor() {
    super(getRepository(OrderType))
  }

}