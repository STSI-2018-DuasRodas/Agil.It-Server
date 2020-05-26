import { getRepository } from "typeorm";
import { WorkedTime } from "../models/maintenance-order/WorkedTime";
import { CrudController } from "./CrudController";

export class WorkedTimeController extends CrudController<WorkedTime> {

  constructor() {
    super(getRepository(WorkedTime))
  }

  public includes() {
    const includes = [
      'maintenanceWorker',
      'maintenanceWorker.user',
      'maintenanceWorker.maintenanceOrder',
    ]

    return includes;
  }

  public validateGetbyDescription() : boolean {
    return false;
  }
  
}