import { OrderSignature } from './../models/maintenance-order/OrderSignature';
import { OrderEquipmentController } from './OrderEquipment';
import { OrderSignatureController } from './OrderSignature';
import { MaintenanceWorkerController } from './MaintenanceWorker';
import { getRepository, Repository, SelectQueryBuilder } from "typeorm";
import { getValueWhereConditions, normalizeOrmKeyValue, mountExtraConditions, filterDeleteds, changeValuePerKey } from './Utils';
import { validate } from "class-validator";
import { MaintenanceOrder } from "../models/maintenance-order/MaintenanceOrder";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import JWT from "../config/JWT";
import { MaintenanceWorker } from "../models/maintenance-order/MaintenanceWorker";
import { getIntegrionUser } from '../middlewares/checkJwt';
import { User } from "../models/User";
import { v4 as uuid } from 'uuid';
import { UserController } from './User';
import { SignatureStatus } from '../models/enum/SignatureStatus';
import { OrderStatus } from '../models/enum/OrderStatus';
import { SignatureRole } from '../models/enum/SignatureRole';
import { UserRole } from '../models/enum/UserRole';

export class MaintenanceOrderController {

  private repositoryEntity : Repository<MaintenanceOrder>;

  constructor() {
    this.repositoryEntity = getRepository(MaintenanceOrder)
  }

	public getRepositoryEntity(): Repository<MaintenanceOrder> {
		return this.repositoryEntity;
  }

  public async all(request: Request, response: Response, next: NextFunction) {

    const { equipment, installationArea } = request.query;
    const { skip, take } = request.headers;

    const where = {
      deleted: false,
      ...this.getWhereConditions(request.params, request.query, this.getRepositoryEntity().create()),
    };

    // ? Connection is required to translate to correct sql syntax
    const connection = this.getRepositoryEntity().manager.connection;

    const extraConditions = [
      ...(equipment ? [mountExtraConditions(connection ,'equipment.id', equipment)] : []),
      ...(installationArea ? [mountExtraConditions(connection ,'installationArea.id', installationArea)] : []),
    ];

    const queryBuilder = this.getRepositoryEntity()
      .createQueryBuilder('maintenanceOrder')
      .leftJoinAndSelect('maintenanceOrder.orderLayout', 'orderLayout')
      .leftJoinAndSelect('maintenanceOrder.orderEquipment', 'orderEquipment')
      .leftJoinAndSelect('orderEquipment.equipment', 'equipment')
      .leftJoinAndSelect('orderEquipment.installationArea', 'installationArea')
      .where(where);
    
    extraConditions.forEach(condition => {
      if (typeof condition === 'string')
        queryBuilder.andWhere(condition);
      else
        queryBuilder.andWhere(condition.key, condition.value);
    });

    const arrayOfOrders = await queryBuilder.skip(<any>skip)
      .take(<any>take)
      .getMany();
    
    return arrayOfOrders.map((order) => this.removeProperties(order, this.fieldsToIgnoreResume()));
  }

  public async getOrder(request: Request, response: Response, next: NextFunction) {
    const orderId = request.params.id;
    const showDeletedFields = request.query.showDeletedFields;

    const order: MaintenanceOrder = await this.getOrderById(orderId);
    if (!order) throw `Ordem ${orderId} não cadastrada`

    if (showDeletedFields) return order;

    return filterDeleteds(order);
  }
  
  public async getOrderById(orderId) {
    return this.getRepositoryEntity().findOne({
      relations: this.getAllRelations(),
      where: { id: orderId }
    });
  }
  
  public async createOrder(request: Request, response: Response, next: NextFunction) {
    const order = this.getRepositoryEntity().create(<MaintenanceOrder>request.body);

    const token = <string>request.headers["token"];
    const authorization = <string>request.headers["authorization"];

    await this.updateFields(token, authorization, order);

    return await this.saveOrder(order)

  }
  
  public async updateOrder(request: Request, response: Response, next: NextFunction) {
    let order: MaintenanceOrder

    try {
      order = await this.getRepositoryEntity().findOneOrFail(request.params.id,{ relations: [...this.getOrderRelations()]});
      order = this.getRepositoryEntity().merge(order, request.body)
    } catch (error) {
      throw `Ordem ${request.params.id} não encontrada`;
    }

    const token = <string>request.headers["token"];
    const authorization = <string>request.headers["authorization"];

    await this.updateFields(token, authorization, order);

    return await this.saveOrder(order)
    
  }
  
  public async saveOrder(order: MaintenanceOrder) {

    //Validade if the parameters are ok
    const error = await this.validate(order)
    if (error !== undefined) {
      throw error;
    }
    
    const isInserting = typeof order['id'] !== 'number'

    if (order["integrationID"] != '' && isInserting) {

      try {
        const integrationId = order["integrationID"];
        const duplicated = await this.getRepositoryEntity().findOneOrFail({
          where: {
            integrationID: integrationId,
            deleted: false,
          }
        });

        if (isInserting || (!isInserting && duplicated['id'] != order['id'])) {
          throw `Registro com o integrationID ${integrationId} já existe.`;
        }

        throw `Registro com o integrationID ${integrationId} já existe.`;
      } catch (error) {
        if (typeof error === "string" && error.substr(0,28) === "Registro com o integrationID") {
          throw error;
        }
      }
    }

    const preSave = await this.preSave(order, isInserting)

    let orderSaved: MaintenanceOrder;

    orderSaved = await this.getRepositoryEntity().save(order);
    await this.posSave(orderSaved, isInserting, preSave)

    return await this.getRepositoryEntity().findOne(orderSaved["id"], {
      relations: this.getAllRelations(),
    });
  }

  public async deleteOrder(request: Request, response: Response, next: NextFunction) {
    let order: MaintenanceOrder

    try {
      order = await this.getRepositoryEntity().findOneOrFail(request.params.id, {relations: this.getAllRelations()});
    } catch (error) {
      throw `Ordem ${request.params.id} não encontrada`;
    }

    if (order["deleted"] === true) {
      throw `Ordem ${request.params.id} já está excluída`;
    }

    const token = <string>request.headers["token"];
    const authorization = <string>request.headers["authorization"];

    await this.updateFields(token, authorization, order);

    order["deleted"] = true;
    
    if (order["integrationID"] != "") {
      order["integrationID"] = `${order['integrationID']}-uuid-${uuid()}`
    }

    const errors = await validate(order);
    if (errors.length > 0) {
      throw errors;
    }

    let result = await this.getRepositoryEntity().save(order)
    if (!result) throw "Erro ao deletar a ordem";

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
        qb.where(
          where
        ).andWhere('maintenanceWorker.userId = :id', {id: maintenerId});
      }
    });

    return arrayOfOrders.map((order) => this.removeProperties(order, this.fieldsToIgnoreResume()))
  }

  public async getOrderMainteners(request: Request, response: Response, next: NextFunction) {
    // route: maintenance-orders/:id/mainteners
    const orderId = request.params.id;

    return await new MaintenanceWorkerController().getRepositoryEntity()
      .createQueryBuilder('maintenanceWorker')
      .leftJoin('maintenanceWorker.maintenanceOrder', 'maintenanceOrder')
      .where('maintenanceWorker.deleted = :deleted', { deleted: false })
      .andWhere('maintenanceOrder.id = :maintenanceOrderId', { maintenanceOrderId: orderId })
      .getMany();
  }
  
  public async getOrderSignatures(request: Request, response: Response, next: NextFunction) {
    // route: maintenance-orders/:id/signatures
    const orderId = request.params.id;

    return await new OrderSignatureController().getRepositoryEntity()
      .createQueryBuilder('signatureOrder')
      .leftJoin('signatureOrder.maintenanceOrder', 'maintenanceOrder')
      .where('signatureOrder.deleted = :deleted', { deleted: false })
      .andWhere('maintenanceOrder.id = :maintenanceOrderId', { maintenanceOrderId: orderId })
      .getMany();
  }

  public async updateStatusRequest(request: Request, response: Response, next: NextFunction) {
    // route: [PUT] maintenance-orders/:id/status
    const orderId = request.params.id;

    const { userId, orderStatus } = request.body;

    return this.updateOrderStatus(orderId, userId, orderStatus);
  }

  public async updateOrderStatus(orderId: number | string, userId: number | string, newStatus: string) {

    if (!this.validateStatus(newStatus)) {
      throw `Status informado não é válido. deveria ser um dos seguintes: ${Object.keys(OrderStatus).join(', ')}`
    }

    const maintenanceOrder = await this.getOrderById(orderId);
    if (!maintenanceOrder) {
      throw `Ordem ${orderId} não cadastrada`;
    }

    const currentStatus = maintenanceOrder.orderStatus;
    const maintenanceWorker: MaintenanceWorker = maintenanceOrder.getMainWorker();

    if (currentStatus === newStatus) {
      return { status: newStatus };
    }

    if (currentStatus === 'created' && newStatus !== 'assumed') {
      throw 'Ordem deveria ser assumida primeiro';
    }

    if (newStatus === 'assumed' && maintenanceWorker && maintenanceWorker.user.id !== userId) {
      throw 'Ordem já está assumida por outro manutentor';
    } else if (newStatus === 'assumed' && !maintenanceWorker) {
      const newMaintener = new MaintenanceWorker();
      newMaintener.isActive = true;
      newMaintener.isMain = true;
      newMaintener.user = await new UserController().get(userId);

      if (!Array.isArray(maintenanceOrder.maintenanceWorker)) maintenanceOrder.maintenanceWorker = [];
      maintenanceOrder.maintenanceWorker.push(newMaintener);
    } else if (['signed', 'finished'].includes(newStatus)) {
      const currentSignatures = (maintenanceOrder.orderSignature || []).filter(signature => {
        if (signature.deleted === true) return false;
        if (signature.signatureStatus !== SignatureStatus.SIGNED) return false;

        return true;
      })
      
      if (currentSignatures.length < 3) throw `Ordem ainda possui pendências de assinatura`

      const { status, missingRoles } = this.validateOrderSigned(currentSignatures);
      if (!status) {
        throw `Ordem com pendência de assinatura: ${missingRoles.join(', ')}`
      }
    }
    
    await this.saveOrder(maintenanceOrder);

    return { status: newStatus };
  }

  public validateOrderSigned(signatures: Array<OrderSignature>, customSignatureRoles?: object): { status: boolean, missingRoles: Array<string>} {
    
    const pendingRoleSignatures = { ...(customSignatureRoles || changeValuePerKey(SignatureRole)) };

    signatures.forEach(signature => {
      if (signature.signatureStatus === SignatureStatus.SIGNED) {
        delete pendingRoleSignatures[signature.signatureRole];
      }
    });

    const missingRoles = Object.keys(pendingRoleSignatures);

    return {
      status: (missingRoles.length === 0),
      missingRoles,
     };
  }
  
  public async asignOrderRequst(request: Request, response: Response, next: NextFunction) {
    // route: [POST] maintenance-orders/:id/signatures
    const orderId = request.params.id;

    const { userId, status, note } = request.body;

    return this.asignOrder(orderId, userId, status, note || '');
  }

  public async asignOrder(orderId: number | string, userId: number | string, status?: SignatureStatus, note?: string) {
    if (!userId) {
      throw 'usuário não informado (userId)!';
    }

    const user = await new UserController().get(userId);
    if (!user) throw `Usuário ${userId} não cadastrado`;

    const maintenanceOrder: MaintenanceOrder = await this.getOrderById(orderId);
    if (!maintenanceOrder) throw `Ordem ${orderId} não cadastrada`;

    await this.validateOrderSignature(user, maintenanceOrder);

    const signature = new OrderSignature();
    signature.user = user;
    signature.signatureRole = signature.getUserRole(user.role);
    signature.signatureStatus = SignatureStatus.SIGNED;
    signature.note = note || '';
    signature.signatureStatus = status || SignatureStatus.SIGNED;

    maintenanceOrder.orderSignature.push(signature);
    const { status: allSigned } = this.validateOrderSigned(maintenanceOrder.orderSignature);

    let orderStatus: OrderStatus = maintenanceOrder.orderStatus;

    if (!allSigned) {
      orderStatus = OrderStatus.SIGNATURE_PENDING;
      maintenanceOrder.orderStatus = orderStatus;
    }

    const savedOrder = await this.saveOrder(maintenanceOrder);

    if (allSigned) {
      await this.updateOrderStatus(orderId, userId, OrderStatus.SIGNATURED);
      orderStatus = OrderStatus.SIGNATURED;
    }

    return {
      ...savedOrder,
      orderStatus,
    };
  }

  public async validateOrderSignature(user: User, order: MaintenanceOrder) {
    const maintenanceOrder: MaintenanceOrder = filterDeleteds(order);

    if (maintenanceOrder.orderSignature.some(orderSignature => orderSignature.user.id === user.id && orderSignature.signatureStatus !== SignatureStatus.DENIED)) {
      throw 'Usuário já assinou a ordem';
    }

    if (['CREATED', 'ASSUMED', 'CANCELED', 'SIGNATURED', 'FINISHED'].includes(maintenanceOrder.orderStatus)) {
      throw 'Ordem não está em um status válido para assinatura!';
    }

    if (user.role === UserRole.INTEGRATION) {
      throw 'Usuário não pode assinar a ordem';
    } else if (user.role === UserRole.MAINTAINER) {
      if (!maintenanceOrder.maintenanceWorker.some(maintenanceWorker => (maintenanceWorker.isMain && maintenanceWorker.user.id === user.id))) {
        throw 'Apenas o manutentor principal pode assinar a ordem';
      }

    } else if(user.role === UserRole.ADMINISTRATOR) {
      const pendingRoleSignatures = changeValuePerKey({ ...SignatureRole });
      delete pendingRoleSignatures[SignatureRole.ADMINISTRATOR];

      const { status, missingRoles } = this.validateOrderSigned(maintenanceOrder.orderSignature, pendingRoleSignatures);
      if (!status) {
        throw `O administrador só pode assinar quando os demais responsáveis já tiverem assinados! Ainda faltam as seguintes assinaturas: ${missingRoles.join(', ')}`;
      }
    } else {
      if (maintenanceOrder.solicitationUser.id !== user.id) {
        throw `Usuário não qualificado para assinar a ordem`;
      }

      if (!maintenanceOrder.orderSignature.some(orderSignature => orderSignature.signatureRole == SignatureRole.MAINTAINER && orderSignature.signatureStatus == SignatureStatus.SIGNED)) {
        throw `Manutentor deve assinar a ordem primeiro`;
      }

      if (maintenanceOrder.orderSignature.some(orderSignature => orderSignature.signatureRole == SignatureRole.LEADER && orderSignature.signatureStatus != SignatureStatus.DENIED)) {
        throw `Assinatura já realizada`;
      }
    }
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

      const value = entries[key];

      if (entity.hasOwnProperty(keyProperty)) {
        filterObject[keyProperty] = getValueWhereConditions(value);
      } else if(keyProperty.includes('.')) {
        filterObject = normalizeOrmKeyValue({[keyProperty]: getValueWhereConditions(value)}, filterObject);
      }
    });

    return filterObject;
  }

  async updateFields(token:string, authorization:string, entity :MaintenanceOrder) {

    let userId;

    if (token) {
      let jwtPayload = <any>jwt.verify(token, JWT.jwtSecret);
      userId = jwtPayload.userId;
    } else {
      const user:User = await getIntegrionUser(authorization)
      userId= user.id;
    }
    
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
      'description',
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
      'workCenter',
      'orderLayout',
      'solicitationUser',
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
      'orderEquipment.defectOrigin',
      'orderEquipment.defectSymptom',
      'orderEquipment.equipment',
      'orderEquipment.equipment.machineType',
      'orderEquipment.superiorEquipment',
      'orderEquipment.installationArea',
      'orderEquipment.installationArea.sector',
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
  
  /**
    @param { MaintenanceOrder } order entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
  */
  public async preSave(order: MaintenanceOrder, isInserting: boolean) {
    return this.getAndRemoveSubTables(order)
  }


  /**
    @param { MaintenanceOrder } order entidade que está sendo salva
    @param { boolean } isInserting se está inserindo recebe true, se estivar alterando recebe false
    @param { any } preSave retorno do método preSave
  */
  public async posSave(order: MaintenanceOrder, isInserting: boolean, preSave: any) {
    const userId = order['updatedBy'];
    const subTables = this.mountSubTablesData(preSave)

    for (let index = 0; index < subTables.length; index++) {
      const table = subTables[index];

      const { data } = table;
      const controller = table.instance()

      if (!Array.isArray(data)) continue;

      for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        
        if (typeof obj !== 'object' || obj === null) continue

        obj['updatedBy'] = userId;
        if (obj['createdBy'] === undefined) {
          obj['createdBy'] = userId;
        }

        obj['maintenanceOrder'] = order;

        await controller.saveEntity(obj)
      }
    };
  }


  /**
    @param { MaintenanceOrder } order entidade que está sendo deletado
  */
  public async preDelete(order: MaintenanceOrder) {
    return this.getAndRemoveSubTables(order)
  }

  /**
    @param { MaintenanceOrder } order entidade que está sendo deletado
    @param { any } preDelete retorno do método preDelete
  */
  public async posDelete(order: MaintenanceOrder, preDelete: any) {
    /*
    const userId = order['updatedBy'];
    const subTables = this.mountSubTablesData(preDelete)

    subTables.forEach(async (table: any) => {
      
      const { data } = table;
      const controller = table.instance()

      if (!Array.isArray(data)) return;

      for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        
        obj['updatedBy'] = userId;

        await controller.removeEntity(obj)
      }

    });
    /**/
  }

  public getAndRemoveSubTables(order: MaintenanceOrder) {
    const { maintenanceWorker, orderSignature, orderEquipment } = order;

    delete order['orderSignature'];
    delete order['orderEquipment'];
    delete order['maintenanceWorker'];

    return {
      orderSignature,
      orderEquipment,
      maintenanceWorker,
    };
  }

  public mountSubTablesData(subTables) {
    const { maintenanceWorker, orderSignature, orderEquipment } = subTables;

    return [
      {
        'instance': () => new MaintenanceWorkerController(),
        'data': maintenanceWorker,
      },
      {
        'instance': () => new OrderSignatureController(),
        'data': orderSignature,
      },
      {
        'instance': () => new OrderEquipmentController(),
        'data': orderEquipment,
      },
    ];
  }
  
  public validateStatus(status) {
    return Object.values(OrderStatus).includes(status);
  }
}