import { getRepository } from "typeorm";
import { MachineType } from "../models/MachineType";
import { CrudController } from "./CrudController";

export class MachineTypeController extends CrudController<MachineType> {

  constructor() {
    super(getRepository(MachineType))
  } 

}