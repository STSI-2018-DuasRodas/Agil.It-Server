import { getRepository } from "typeorm";
import { DefectOrigin } from "../models/DefectOrigin";
import { CrudController } from "./CrudController";

export class DefectOriginController extends CrudController<DefectOrigin> {

  constructor() {
    super(getRepository(DefectOrigin))
  } 

}