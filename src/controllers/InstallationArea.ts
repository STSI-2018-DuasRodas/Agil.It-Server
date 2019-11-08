import { getRepository } from "typeorm";
import { InstallationArea } from "../models/InstallationArea";
import { CrudController } from "./CrudController";

export class InstallationAreaController extends CrudController<InstallationArea> {

  constructor() {
    super(getRepository(InstallationArea))
  } 

}