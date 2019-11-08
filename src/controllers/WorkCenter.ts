import { getRepository } from "typeorm";
import { WorkCenter } from "../models/WorkCenter";
import { CrudController } from "./CrudController";

export class WorkCenterController extends CrudController<WorkCenter> {

  constructor() {
    super(getRepository(WorkCenter))
  }

}