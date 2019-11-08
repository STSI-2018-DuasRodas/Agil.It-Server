import { getRepository } from "typeorm";
import { SecurityParam } from "../models/SecurityParam";
import { CrudController } from "./CrudController";

export class SecurityParamController extends CrudController<SecurityParam> {

  constructor() {
    super(getRepository(SecurityParam))
  }

}