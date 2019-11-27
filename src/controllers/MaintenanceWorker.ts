import { getRepository } from "typeorm";
import { MaintenanceWorker } from "../models/maintenance-order/MaintenanceWorker";
import { CrudController } from "./CrudController";

export class MaintenanceWorkerController extends CrudController<MaintenanceWorker> {

  constructor() {
    super(getRepository(MaintenanceWorker))
  }
  
}