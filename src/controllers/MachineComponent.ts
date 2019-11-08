import { getRepository } from "typeorm";
import { MachineComponent } from "../models/MachineComponent";
import { CrudController } from "./CrudController";

export class MachineComponentController extends CrudController<MachineComponent> {

  constructor() {
    super(getRepository(MachineComponent))
  } 

}