import { getRepository } from "typeorm";
import { DefectSymptom } from "../models/DefectSymptom";
import { CrudController } from "./CrudController";

export class DefectSymptomController extends CrudController<DefectSymptom> {

  constructor() {
    super(getRepository(DefectSymptom))
  } 

}