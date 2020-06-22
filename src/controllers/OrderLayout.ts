import { getRepository } from "typeorm";
import { OrderLayout } from "../models/OrderLayout";
import { CrudController } from "./CrudController";

export class OrderLayoutController extends CrudController<OrderLayout> {

  constructor() {
    super(getRepository(OrderLayout))
  }

  public validateGetbyDescription() : boolean {
    return false;
  }
}