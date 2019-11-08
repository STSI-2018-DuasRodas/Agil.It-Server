import { getRepository } from "typeorm";
import { SuperiorEquipment } from "../models/SuperiorEquipment";
import { CrudController } from "./CrudController";

export class SuperiorEquipmentController extends CrudController<SuperiorEquipment> {

  constructor() {
    super(getRepository(SuperiorEquipment))
  }

}