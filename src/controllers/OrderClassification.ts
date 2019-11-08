import { getRepository } from "typeorm";
import { OrderClassification } from "../models/OrderClassification";
import { CrudController } from "./CrudController";

export class OrderClassificationController extends CrudController<OrderClassification> {

  constructor() {
    super(getRepository(OrderClassification))
  }

}