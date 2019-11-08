import { getRepository } from "typeorm";
import { Equipment } from "../models/Equipment";
import { CrudController } from "./CrudController";

export class EquipmentController extends CrudController<Equipment> {

  constructor() {
    super(getRepository(Equipment))
  } 

}