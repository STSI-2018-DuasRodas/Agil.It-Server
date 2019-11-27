import { getRepository } from "typeorm";
import { WorkerRequest } from "../models/maintenance-order/WorkerRequest";
import { CrudController } from "./CrudController";

export class WorkerRequestController extends CrudController<WorkerRequest> {

  constructor() {
    super(getRepository(WorkerRequest))
  }
  
}