import { getRepository, Repository, getConnection, SelectQueryBuilder } from "typeorm";
import { MaintenanceOrder } from "../models/maintenance-order/MaintenanceOrder";
import {NextFunction, Request, Response} from "express";

export class MaintenanceOrderController {

  private repositoryEntity : Repository<MaintenanceOrder>;
  private connection = getConnection();

  constructor() {
    this.repositoryEntity = getRepository(MaintenanceOrder)
  }

	public getRepositoryEntity(): Repository<MaintenanceOrder> {
		return this.repositoryEntity;
  }

  public async getOrdersByMaintener(request: Request, response: Response, next: NextFunction) {

    let maintenerId = request.params.id;

    const arrayOfOrders = await this.getRepositoryEntity().find({
      select: <any>this.fieldsResume(),
      join: {
        alias: 'order',
        leftJoin: {
          maintenanceWorker: 'order.maintenanceWorker',
        },
        leftJoinAndSelect: {
          maintenanceEquipment: 'order.orderEquipment'
        }
      },
      where: (qb: SelectQueryBuilder<MaintenanceOrder>) => {
        qb.where({
          deleted: false,
        }).andWhere('maintenanceWorker.userId = :id', {id: maintenerId});
      }
    });

    return arrayOfOrders.map((order) => {
      return this.removeProperties(order, this.fieldsToIgnoreResume())
    })
  }

  public async all(request: Request, response: Response, next: NextFunction) {

    const arrayOfOrders = await this.getRepositoryEntity().find({
      select: <any>this.fieldsResume(),
      relations: ['orderEquipment', 'maintenanceWorker', 'maintenanceWorker.user'],
      where: { deleted: false }
    });

    return arrayOfOrders.map((order) => {
      return this.removeProperties(order, this.fieldsToIgnoreResume())
    })
  }

  public async getOrder(request: Request, response: Response, next: NextFunction) {
    let orderId = request.params.id;

    return this.getRepositoryEntity().find({
      relations: this.getAllRelations(),
      where: { id: orderId }
    });
  }
  
  public async createOrder(request: Request, response: Response, next: NextFunction) {
    
  }
  
  public async updateOrder(request: Request, response: Response, next: NextFunction) {
    
  }
  
  public async deleteOrder(request: Request, response: Response, next: NextFunction) {
    
  }

  public fieldsResume() {
    return [
      'id',
      'orderNumber',
      'openedDate',
      'priority',
      'orderStatus',
      'orderLayout',
    ];
  }
  
  public fieldsToIgnoreResume() {
    return [
      'integrationID',
      'deleted',
      'orderType',
      'orderClassification',
      'needStopping',
      'isStopped',
      'exported',
    ];
  }

  public getAllRelations() {
    return [
      ...this.getOrderRelations(),
      ...this.getMaintenanceWorkerRelations(),
      ...this.getOrderEquipmentRelations(),
    ];
  }

  public getOrderRelations() {
    return [
      'orderType',
      'orderClassification',
      'orderLayout',
    ];
  }

  public getMaintenanceWorkerRelations() {
    return [
      'maintenanceWorker',
      'maintenanceWorker.user',
      'maintenanceWorker.workedTime',
      'maintenanceWorker.workerRequest',
      'maintenanceWorker.workerRequest.requestedBy',
    ];
  }
  
  public getOrderEquipmentRelations() {
    return [
      'orderEquipment',
      'orderEquipment.equipment',
      'orderEquipment.superiorEquipment',
      'orderEquipment.installationArea',
      ...this.getOrderOperationsRelations(),
    ];
  }

  public getOrderOperationsRelations() {
    return [
      'orderEquipment.orderOperation',
      'orderEquipment.orderOperation.defaultObservation',
      'orderEquipment.orderOperation.orderComponent',
      'orderEquipment.orderOperation.orderComponent.item',
    ];
  }

  public removeProperties(order: MaintenanceOrder, propertiesExclude: Array<string>) {
    propertiesExclude.forEach(property => {
      if (order.hasOwnProperty(property)) {
        delete order[property];
      }
    });

    return order;
  }
}