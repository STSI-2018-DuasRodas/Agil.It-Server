import { getRepository, Repository, SelectQueryBuilder } from "typeorm";
import { validate } from "class-validator";
import { MaintenanceOrder } from "../models/maintenance-order/MaintenanceOrder";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";
import { MaintenanceWorker } from "../models/maintenance-order/MaintenanceWorker";

export class MaintenanceOrderController {

  private repositoryEntity : Repository<MaintenanceOrder>;

  constructor() {
    this.repositoryEntity = getRepository(MaintenanceOrder)
  }

	public getRepositoryEntity(): Repository<MaintenanceOrder> {
		return this.repositoryEntity;
  }

  public async all(request: Request, response: Response, next: NextFunction) {

    const where = {
      deleted: false,
      ...this.getWhereConditions(request.params, request.query, this.getRepositoryEntity().create()),
    };

    const arrayOfOrders = await this.getRepositoryEntity().find({
      select: <any>this.fieldsResume(),
      relations: ['orderLayout', 'orderEquipment', 'orderEquipment.equipment', 'maintenanceWorker', 'maintenanceWorker.user'],
      where,
    });

    return arrayOfOrders.map((order) => {
      return this.removeProperties(order, this.fieldsToIgnoreResume())
    });
  }

  public async getOrder(request: Request, response: Response, next: NextFunction) {
    let orderId = request.params.id;

    return this.getRepositoryEntity().findOne({
      relations: this.getAllRelations(),
      where: { id: orderId }
    });
  }
  
  public async createOrder(request: Request, response: Response, next: NextFunction) {
    const order = this.getRepositoryEntity().create(<MaintenanceOrder>request.body);

    const token = <string>request.headers["token"];
    this.updateFields(token, order);

    //Validade if the parameters are ok
    const error = await this.validate(order)
    if (error !== undefined) {
      throw {
        success: false,
        error: error
      }
    }
    
    if (order["integrationID"] != "") {
      try {
        await this.getRepositoryEntity().findOneOrFail({where: {integrationID: order["integrationID"]}});
        throw {"success":false,"error":`Registro com o integrationID ${order["integrationID"]} já existe.`};
      } catch (error) {
        // Não está duplicado
      }
    }

    return await this.getRepositoryEntity().save(order);
  }
  
  public async updateOrder(request: Request, response: Response, next: NextFunction) {
    let order: MaintenanceOrder

    try {
      order = await this.getRepositoryEntity().findOneOrFail(request.params.id,{ relations: [...this.getOrderRelations()]});
      order = this.getRepositoryEntity().merge(order, request.body)
    } catch (error) {
      throw {
        message: `Ordem ${request.params.id} não encontrada`,
        details: error
      };
    }

    const token = <string>request.headers["token"];
    this.updateFields(token, order);

    const errors = await validate(order);
    if (errors.length > 0) {
      throw {
        "success":false,
        "error":errors
      };
    }

    let result = await this.getRepositoryEntity().update(request.params.id,order)
    if (!result) throw { "success":false, "error":`Erro ao executar a atualização da ordem ${request.params.id}` }

    return await this.getRepositoryEntity().findOne(request.params.id, {relations: this.getAllRelations()});
  }
  
  public async deleteOrder(request: Request, response: Response, next: NextFunction) {
    let order: MaintenanceOrder

    try {
      order = await this.getRepositoryEntity().findOneOrFail(request.params.id, {relations: this.getAllRelations()});
    } catch (error) {
      throw { "success":false, "error":`Ordem ${request.params.id} não encontrada` };
    }

    if (order["deleted"] === true) {
      throw { "success":false, "error":`Ordem ${request.params.id} já está excluída` };
    }

    const token = <string>request.headers["token"];
    this.updateFields(token, order);

    order["deleted"] = true;
    const errors = await validate(order);
    if (errors.length > 0) {
      throw {
        "success":false,
        "error":errors
      };
    }

    let result = await this.getRepositoryEntity().save(order)
    if (!result) throw { "success":false, "error":"Erro ao deletar a ordem" }

    order.maintenanceWorker.forEach((maintenanceWorker: MaintenanceWorker) => {
      const maintenanceOrderController = new MaintenanceOrderController()
    })

    return await this.getRepositoryEntity().findOne(request.params.id);
  }

  public async getOrdersByMaintener(request: Request, response: Response, next: NextFunction) {
    // route: order-mainteners/:id/orders

    let maintenerId = request.params.id;
    const where = {
      deleted: false,
      ...this.getWhereConditions({}, request.query, this.getRepositoryEntity().create()),
    }

    const arrayOfOrders = await this.getRepositoryEntity().find({
      select: <any>this.fieldsResume(),
      join: {
        alias: 'order',
        leftJoin: {
          maintenanceWorker: 'order.maintenanceWorker',
        },
        leftJoinAndSelect: {
          maintenanceEquipment: 'order.orderEquipment',
          orderLayout: 'order.orderLayout',
          equipment : 'maintenanceEquipment.equipment',
        }
      },
      where: (qb: SelectQueryBuilder<MaintenanceOrder>) => {
        qb.where({
          where,
        }).andWhere('maintenanceWorker.userId = :id', {id: maintenerId});
      }
    });

    return arrayOfOrders.map((order) => {
      return this.removeProperties(order, this.fieldsToIgnoreResume())
    })
  }

  public async getOrderMainteners(request: Request, response: Response, next: NextFunction) {
    // route: maintenance-orders/:id/mainteners
    const orderId = request.params.id;

    return this.getRepositoryEntity().findOne({
      select: ['maintenanceWorker'],
      relations: this.getMaintenanceWorkerRelations(),
      where: { id: orderId }
    });
  }
  
  public async getOrderSignatures(request: Request, response: Response, next: NextFunction) {
    // route: maintenance-orders/:id/signatures
    const orderId = request.params.id;
  }

  public getWhereConditions(params: any = {}, query: any = {}, entity: any) {

    let filterObject = {};

    const entries = {
      ...query,
      ...params,
    };

    const keys = Object.keys(entries);

    keys.forEach(key => {

      let keyProperty = '';

      if(key.length > 2 && key.substr(key.length-2,2) == 'Id') {
        keyProperty=key.substr(0,key.length-2)
      } else {
        keyProperty=key
      }

      if (entity.hasOwnProperty(keyProperty)) {
        filterObject[keyProperty]=entries[key];
      }
    });

    return filterObject;
  }

  updateFields(token:string, entity : MaintenanceOrder) {
    let jwtPayload = <any>jwt.verify(token, JWT.jwtSecret);
    const { userId } = jwtPayload;

    entity["updatedBy"] = userId;
    if (entity["createdBy"] === undefined) {
      entity["createdBy"] = userId;
    }
  }

  async validate(entity: MaintenanceOrder) : Promise<any> {
    const errors = await validate(entity);

    if (errors.length === 0) {
      return undefined
    }
    
    let errorList = []

    errors.forEach(error => {
      let constraints = error.constraints

      for (const key in constraints) {
        if (constraints.hasOwnProperty(key)) {
          errorList.push(constraints[key])
        }
      }
    });

    return errorList
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
      ...this.getOrderSignatureRelations(),
    ];
  }

  public getOrderRelations() {
    return [
      'orderType',
      'orderClassification',
      'orderLayout',
      'defectOrigin',
      'defectSymptom',
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
      'orderEquipment.equipment.machineType',
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

  public getOrderSignatureRelations() {
    return [
      "orderSignature",
      "orderSignature.user",
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