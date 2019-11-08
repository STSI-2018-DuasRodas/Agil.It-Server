import { getRepository } from "typeorm";
import { MeasurementUnit } from "../models/MeasurementUnit";
import { CrudController } from "./CrudController";

export class MeasurementUnitController extends CrudController<MeasurementUnit> {

  constructor() {
    super(getRepository(MeasurementUnit))
  } 

}