import { MaintenanceOrder as Model } from '../models/maintenance-order/MaintenanceOrder';
import { MaintenanceOrderController } from '../controllers/MaintenanceOrder';
import { Seed } from "./Seed";
import { OrderPriority } from '../models/enum/OrderPriority';
import { OrderStatus } from '../models/enum/OrderStatus';
import { OrderComponent } from '../models/maintenance-order/OrderComponent';
import { OrderEquipment } from '../models/maintenance-order/OrderEquipment';
import { OrderLayout } from '../models/OrderLayout';
import { OrderLayout as EnumOrderLayout } from "../models/enum/OrderLayout"
import { Default } from '../models/maintenance-order/Default';
import { List } from '../models/maintenance-order/List';
import { Route } from '../models/maintenance-order/Route';
import { OrderClassificationController } from '../controllers/OrderClassification';
import { OrderTypeController } from '../controllers/OrderType';
import { OrderLayoutController } from '../controllers/OrderLayout';
import { MaintenanceWorker } from '../models/maintenance-order/MaintenanceWorker';
import { Item } from '../models/Item';
import { ItemController } from '../controllers/Item';
import { EquipmentController } from '../controllers/Equipment';
import { SuperiorEquipmentController } from '../controllers/SuperiorEquipment';
import { InstallationAreaController } from '../controllers/InstallationArea';
import { OrderOperation } from '../models/maintenance-order/OrderOperation';
import { DefaultObservationController } from '../controllers/DefaultObservation';
import { OrderOperationController } from '../controllers/OrderOperation';
import { OrderEquipmentController } from '../controllers/OrderEquipment';
import { OrderComponentController } from '../controllers/OrderComponent';
import { MaintenanceWorkerController } from '../controllers/MaintenanceWorker';
import { UserController } from '../controllers/User';
import { OrderType } from '../models/OrderType';
import { OrderClassification } from '../models/OrderClassification';

export class MaintenanceOrder extends Seed {

  public static Seed(log: Boolean = true) {
    const maintenanceOrder = new MaintenanceOrder(MaintenanceOrderController);
    return maintenanceOrder.Executar(log);
  }

  public async Mock() {
  
    for (let i = 0; i < 50; i++) {
      await MaintenanceOrder.CreateOrder();
    }

  }

  public static async CreateOrder() {
    const orderNumber: string = this.getOrderNumber(await this.ObterOrderId());
    const layoutId: number = this.getRandomNumber(1,3);
    const orderTypeId: number = this.getRandomNumber(1,3);
    const orderClassificationId: number = this.getRandomNumber(1,3);
    const priority: OrderPriority = this.getRandomOrderPriority();
    const status: OrderStatus = this.getRandomOrderStatus();
    const needStopping: boolean = this.getRandomBoolean();
    const isStopped: boolean = this.getRandomBoolean();
    const exported: boolean = false;
    const openedDate: Date = this.getRandomDate(2020);
    const createdBy: number = 1;
    const updatedBy: number = 1;

    const layout: OrderLayout = await this.getOrderLayout(layoutId);
    const orderType: OrderType = await this.getOrderType(orderTypeId);
    const orderClassification: OrderClassification = await this.getOrderClassification(orderClassificationId);

    let order: Model;

    if (layout.orderLayout === EnumOrderLayout.DEFAULT) {
      order = new Default()

    } else if(layout.orderLayout === EnumOrderLayout.LIST) {
      order = new List()

    } else {
      order = new Route()
    }

    order.orderNumber = orderNumber;
    order.orderLayout = layout;
    order.orderType = orderType;
    order.orderClassification = orderClassification;
    order.createdBy = createdBy;
    order.updatedBy = updatedBy;
    order.exported = exported;
    order.isStopped = isStopped;
    order.needStopping = needStopping;
    order.openedDate = openedDate;
    order.orderStatus = status;
    order.priority = priority;
    
    const controller = new MaintenanceOrderController();
    await controller.getRepositoryEntity().save(order);

    await this.loadOrderEquipment(order);
    await this.loadWorkers(order);
  }

  public static async loadOrderComponents(orderOperation: OrderOperation) {
    const componentsQty: number = this.getRandomNumber(0,3);

    for (let i = 0; i < componentsQty; i++) {
      await this.CreateOrderComponent(orderOperation);
    }
  }
  
  public static async loadOrderEquipment(order: Model) {

    const equipmentQty: number = this.getRandomNumber(1,3);

    for (let i = 0; i < equipmentQty; i++) {
      await this.CreateOrderEquipment(order)
    }
  }

  public static async loadWorkers(order: Model) {
    const workersQty: number = this.getRandomNumber(0,3);

    for (let i = 0; i < workersQty; i++) {
      const isMain = (i === 0)  // Apenas o primeiro é o principal
      await this.CreateWorker(order, isMain)
    }
  }
  
  public static async CreateOrderComponent(orderOperation: OrderOperation): Promise<any> {

    const itemId: number = this.getRandomNumber(1,3);
    const quantity: number = this.getRandomNumber(1,10);
    const canBeDeleted: boolean = this.getRandomBoolean();
    const createdBy: number = 1;
    const updatedBy: number = 1;
    
    const item: Item = await this.getItem(itemId);

    const orderComponent = new OrderComponent();
    orderComponent.createdBy = createdBy;
    orderComponent.updatedBy = updatedBy;
    orderComponent.canBeDeleted = canBeDeleted;
    orderComponent.item = item;
    orderComponent.quantity = quantity;
    orderComponent.orderOperation = orderOperation

    const controller = new OrderComponentController();
    await controller.getRepositoryEntity().save(orderComponent);

    return orderComponent;
  }
  
  public static async CreateOrderEquipment(order: Model): Promise<any> {

    const equipmentId: number = this.getRandomNumber(1,3);
    const superiorEquipmentId: number = this.getRandomNumber(1,3);
    const installationAreaId: number = this.getRandomNumber(1,3);
    const createdBy: number = 1;
    const updatedBy: number = 1;

    const equipment = await this.getEquipment(equipmentId)
    const superiorEquipment = await this.getSuperiorEquipment(superiorEquipmentId)
    const installationArea = await this.getInstallationArea(installationAreaId)


    const orderEquipment = new OrderEquipment();

    orderEquipment.equipment = equipment;
    orderEquipment.installationArea = installationArea;
    orderEquipment.superiorEquipment = superiorEquipment;
    orderEquipment.createdBy = createdBy;
    orderEquipment.updatedBy = updatedBy;
    orderEquipment.maintenanceOrder = order;
    
    const controller = new OrderEquipmentController();
    await controller.getRepositoryEntity().save(orderEquipment);

    this.loadOrderOperations(orderEquipment);
  }

  public static async loadOrderOperations(orderEquipment: OrderEquipment): Promise<any> {
    const operationsQty: number = this.getRandomNumber(0,3);

    for (let i = 0; i < operationsQty; i++) {
      await this.CreateOperation(orderEquipment,i+1);
    }
  }
  
  public static async CreateOperation(orderEquipment: OrderEquipment, operationNumber: number): Promise<any> {

    const planningTime:number = this.getRandomNumber(15,300);
    let executeTime:number = this.getRandomNumber(0,(planningTime * 1.5));
    const executed = ((executeTime/planningTime) >= 0.85)  // Ter feito pelo menos 85% do trabalho
    const description: string = this.getRandomDescription()
    const defaultObservationId: number = this.getRandomNumber(1,3);
    const createdBy: number = 1;
    const updatedBy: number = 1;

    if (!executed) executeTime = 0;

    const defaultObservation = await this.getDefaultObservation(defaultObservationId)

    const operation = new OrderOperation();

    operation.planningTime = planningTime;
    operation.executeTime = executeTime;
    operation.executed = executed;
    operation.operationNumber = operationNumber;
    operation.defaultObservation = defaultObservation;
    operation.description = description;
    operation.createdBy = createdBy;
    operation.updatedBy = updatedBy;
    operation.orderEquipment = orderEquipment;

    const controller = new OrderOperationController();
    await controller.getRepositoryEntity().save(operation);

    this.loadOrderComponents(operation);
  }

  public static async CreateWorker(order: Model, isMain: boolean): Promise<any> {
    
    const userId: number = this.getRandomNumber(1,4);
    const isActive: boolean = isMain ? true : this.getRandomBoolean()
    const createdBy: number = 1;
    const updatedBy: number = 1;

    const user = await this.getUser(userId);

    const maintenanceWorker = new MaintenanceWorker();
    maintenanceWorker.user = user;
    maintenanceWorker.isActive = isActive;
    maintenanceWorker.isMain = isMain;
    maintenanceWorker.createdBy = createdBy;
    maintenanceWorker.updatedBy = updatedBy;
    maintenanceWorker.maintenanceOrder = order;
    
    const controller = new MaintenanceWorkerController();
    await controller.getRepositoryEntity().save(maintenanceWorker);
  }

  public static async ObterOrderId() {
    const controller = new MaintenanceOrderController();
    const lastId = await controller.getRepositoryEntity().count();

    return lastId + 1;
  }

  public static async getOrderLayout(layoutId: number): Promise<any> {
    const controller = new OrderLayoutController();
    return await controller.getRepositoryEntity().findOne(layoutId);
  }
  
  public static async getOrderType(orderTypeId: number): Promise<any> {
    const controller = new OrderTypeController();
    return await controller.getRepositoryEntity().findOne(orderTypeId);
  }
  
  public static async getOrderClassification(orderClassificationId: number): Promise<any> {
    const controller = new OrderClassificationController();
    return await controller.getRepositoryEntity().findOne(orderClassificationId);
  }
  
  public static async getItem(itemId: number): Promise<any> {
    const controller = new ItemController();
    return await controller.getRepositoryEntity().findOne(itemId);
  }
  
  public static async getEquipment(equipmentId: number): Promise<any> {
    const controller = new EquipmentController();
    return await controller.getRepositoryEntity().findOne(equipmentId);
  }
  
  public static async getSuperiorEquipment(superiorEquipmentId: number): Promise<any> {
    const controller = new SuperiorEquipmentController();
    return await controller.getRepositoryEntity().findOne(superiorEquipmentId);
  }
  
  public static async getInstallationArea(installationAreaId: number): Promise<any> {
    const controller = new InstallationAreaController();
    return await controller.getRepositoryEntity().findOne(installationAreaId);
  }
  
  public static async getDefaultObservation(defaultObservationId: number): Promise<any> {
    const controller = new DefaultObservationController();
    return await controller.getRepositoryEntity().findOne(defaultObservationId);
  }
  
  public static async getUser(userId: number): Promise<any> {
    const controller = new UserController();
    return await controller.getRepositoryEntity().findOne(userId);
  }

  public static getOrderNumber(orderId: number): string
  {
    const prefixo = 'AGL';
    const number = orderId.toString().padStart(6,'0')

    const orderNumber = `${prefixo}-${number}`;
    return orderNumber;
  }

  public static getRandomOrderPriority(): OrderPriority
  {
    const arrayKeys = Object.keys(OrderPriority);
    const key = this.getRandomNumber(0, arrayKeys.length - 1)

    return OrderPriority[key];
  }
  
  public static getRandomOrderStatus(): OrderStatus
  {
    const arrayKeys = Object.keys(OrderStatus);
    const key = this.getRandomNumber(0, arrayKeys.length - 1)

    return OrderStatus[key];
  }

  public static getRandomNumber(min : number = 0, max: number = 3): number {
    let result: number;

    const multiplicador: number = 10 ** max.toString().length;

    do {
      result = Math.round(Math.random() * multiplicador);
    } while(!this.inRange(result, min, max))

    return result;
  }

  public static getRandomBoolean(): boolean {
    const array = [false, true];
    return array[this.getRandomNumber(0, 1)];
  }

  public static getRandomDate(year: number | null | undefined, month: number | null | undefined = null) {
    
    if (typeof year !== 'number') {
      year = new Date().getFullYear();
    }

    if (typeof month !== 'number') {
      month = null;
    }
    
    const initDate = new Date(`${year}-${month ? month : '01'}-01 00:00:00`).getTime()
    const endDate = (month
      ? new Date(`${year}-${month + 1}-01 00:00:00`).getTime() - 1000  /* gordura para voltar 1 dia (pegar último dia do mês) */
      : new Date().getTime() /* hoje */
    )

    const offset = this.getRandomNumber(initDate,endDate);
    
    return new Date(initDate + offset);
  }

  public static inRange(value: number, min: number, max: number): Boolean
  {
    return (value>= min && value <= max);
  }

  public static getRandomDescription(): string {

    const arrayDesciptions = this.getDescriptions();
    const index = this.getRandomNumber(0,arrayDesciptions.length-1);

    return arrayDesciptions[index];
  }

  public static getDescriptions(): Array<string> {
    return [
      "Concertar o motor elétrico",
      "Trocar o componente",
      "Apertar os parafusos",
      "Verificar a integridade do componente",
      "Limpar o componente",
      "Trocar a caldeira",
      "Soldar o componente",
    ];
  }
}