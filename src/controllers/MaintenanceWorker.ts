import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { MaintenanceWorker } from "../models/maintenance-order/MaintenanceWorker";
import { CrudController } from "./CrudController";

export class MaintenanceWorkerController extends CrudController<MaintenanceWorker> {

  constructor() {
    super(getRepository(MaintenanceWorker))
  }
  
  public async getMaintenerWorkedTime(request: Request, response: Response, next: NextFunction) {
    // route: order-mainteners/:maintenerId/worked-time
  }
  
  public async getMaintenerRequests(request: Request, response: Response, next: NextFunction) {
    // route: order-mainteners/:maintenerId/requests
  }

  public includes() {
    return [
      'user',
      'workedTime',
      'workerRequest',
      'maintenanceOrder',
    ]
  }
  
  public validateGetbyDescription() : boolean {
    return false;
  }
}