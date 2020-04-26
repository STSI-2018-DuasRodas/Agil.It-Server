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

    //const components: Array<OrderComponent> | null | undefined = await this.loadOrderComponents();
    const equipments: Array<OrderEquipment> = await this.loadOrderEquipment();
    const workers: Array<MaintenanceWorker> | null = await this.loadWorkers();
    
    const layout: OrderLayout = await this.getOrderLayout(layoutId);
    const orderType: OrderType = await this.getOrderType(orderTypeId);
    const orderClassification: OrderClassification = await this.getOrderClassification(orderClassificationId);

    let order: Model;

    if (layout.getOrderLayout() === EnumOrderLayout.DEFAULT) {
      order = new Default()

    } else if(layout.getOrderLayout() === EnumOrderLayout.LIST) {
      order = new List()

    } else {
      order = new Route()
    }

    order.setOrderNumber(orderNumber);
    order.setOrderLayout(layout);
    order.setOrderType(orderType);
    order.setOrderClassification(orderClassification);
    order.setCreatedBy(createdBy);
    order.setUpdatedBy(updatedBy);
    order.setExported(exported);
    order.setIsStopped(isStopped);
    order.setNeedStopping(needStopping);
    order.setOpenedDate(openedDate);
    order.setOrderStatus(status);
    order.setPriority(priority);
    order.setMaintenanceWorker(workers);
    order.setOrderEquipment(equipments);
    
    const controller = new MaintenanceOrderController();
    await controller.getRepositoryEntity().save(order);

    const equipmentController = new OrderEquipmentController();

    equipments.forEach(async (equipamento: OrderEquipment) => {
      equipamento.setMaintenanceOrder(order);
      
      await equipmentController.getRepositoryEntity().save(equipamento);
      
      const operations: Array<OrderOperation> | null | undefined = await this.loadOrderOperations();
      equipamento.setOrderOperation(operations);
      await this.SaveOperationsId(equipamento);
    })
  }

  public static async loadOrderComponents() {
    const componentsQty: number = this.getRandomNumber(0,3);
    const arrayComponents: Array<OrderComponent> = [];

    for (let i = 0; i < componentsQty; i++) {
      arrayComponents.push(await this.CreateOrderComponent())
    }

    return arrayComponents;
  }
  
  public static async loadOrderEquipment() {

    const equipmentQty: number = this.getRandomNumber(1,3);
    const arrayEquipment: Array<OrderEquipment> = [];

    for (let i = 0; i < equipmentQty; i++) {
      arrayEquipment.push(await this.CreateOrderEquipment())
    }

    return arrayEquipment;
  }

  public static async loadWorkers() {
    const workersQty: number = this.getRandomNumber(0,3);
    const arrayWorkers: Array<MaintenanceWorker> = [];

    for (let i = 0; i < workersQty; i++) {
      const isMain = (i === 0)  // Apenas o primeiro é o principal
      arrayWorkers.push(await this.CreateWorker(isMain))
    }

    return arrayWorkers;
  }
  
  public static async CreateOrderComponent(): Promise<any> {

    const itemId: number = this.getRandomNumber(1,3);
    const quantity: number = this.getRandomNumber(1,10);
    const canBeDeleted: boolean = this.getRandomBoolean();
    const createdBy: number = 1;
    const updatedBy: number = 1;
    
    const item: Item = await this.getItem(itemId);

    const orderComponent = new OrderComponent();
    orderComponent.setCreatedBy(createdBy);
    orderComponent.setUpdatedBy(updatedBy);
    orderComponent.setCanBeDeleted(canBeDeleted);
    orderComponent.setItem(item);
    orderComponent.setQuantity(quantity);

    const controller = new OrderComponentController();
    await controller.getRepositoryEntity().save(orderComponent);

    return orderComponent;
  }
  
  public static async CreateOrderEquipment(): Promise<any> {

    const equipmentId: number = this.getRandomNumber(1,3);
    const superiorEquipmentId: number = this.getRandomNumber(1,3);
    const installationAreaId: number = this.getRandomNumber(1,3);
    const createdBy: number = 1;
    const updatedBy: number = 1;

    const equipment = await this.getEquipment(equipmentId)
    const superiorEquipment = await this.getSuperiorEquipment(superiorEquipmentId)
    const installationArea = await this.getInstallationArea(installationAreaId)


    const orderEquipment = new OrderEquipment();

    orderEquipment.setEquipment(equipment);
    orderEquipment.setInstallationArea(installationArea);
    orderEquipment.setSuperiorEquipment(superiorEquipment);
    orderEquipment.setCreatedBy(createdBy);
    orderEquipment.setUpdatedBy(updatedBy);
    
    const controller = new OrderEquipmentController();
    await controller.getRepositoryEntity().save(orderEquipment);

    return orderEquipment;
  }

  public static async SaveOperationsId(orderEquipment: OrderEquipment): Promise<any> {

    const controller = new OrderOperationController();

    orderEquipment.getOrderOperation().forEach(async (operation: OrderOperation) => {
      operation.setOrderEquipment(orderEquipment);
      await controller.getRepositoryEntity().save(operation);
    });
  }

  public static async loadOrderOperations(): Promise<any> {
    const operationsQty: number = this.getRandomNumber(0,3);
    const arrayOperaions: Array<OrderOperation> = [];

    for (let i = 0; i < operationsQty; i++) {
      arrayOperaions.push(await this.CreateOperation(i+1));
    }

    return arrayOperaions;
  }
  
  public static async CreateOperation(operationNumber: number): Promise<any> {

    const planningTime:number = this.getRandomNumber(15,300);
    const executeTime:number = this.getRandomNumber(0,(planningTime * 1.5));
    const executed = ((executeTime/planningTime) >= 0.85)  // Ter feito pelo menos 85% do trabalho
    const description: string = this.getRandomDescription()
    const defaultObservationId: number = this.getRandomNumber(1,3);
    const createdBy: number = 1;
    const updatedBy: number = 1;

    const defaultObservation = await this.getDefaultObservation(defaultObservationId)

    const operation = new OrderOperation();

    operation.setPlanningTime(planningTime);
    operation.setExecuteTime(executeTime);
    operation.setExecuted(executed);
    operation.setOperationNumber(operationNumber);
    operation.setDefaultObservation(defaultObservation);
    operation.setDescription(description);
    operation.setCreatedBy(createdBy);
    operation.setUpdatedBy(updatedBy);

    const controller = new OrderOperationController();
    await controller.getRepositoryEntity().save(operation);

    return operation;
  }

  public static async CreateWorker(isMain: boolean): Promise<any> {
    
    const userId: number = this.getRandomNumber(1,4);
    const isActive: boolean = isMain ? true : this.getRandomBoolean()
    const createdBy: number = 1;
    const updatedBy: number = 1;

    const user = await this.getUser(userId);

    const maintenanceWorker = new MaintenanceWorker();
    maintenanceWorker.setUser(user);
    maintenanceWorker.setIsActive(isActive);
    maintenanceWorker.setIsMain(isMain);
    maintenanceWorker.setCreatedBy(createdBy);
    maintenanceWorker.setUpdatedBy(updatedBy);
    
    const controller = new MaintenanceWorkerController();
    await controller.getRepositoryEntity().save(maintenanceWorker);

    return maintenanceWorker;
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
    const key = this.getRandomNumber(0, arrayKeys.length)

    return OrderPriority[key];
  }
  
  public static getRandomOrderStatus(): OrderStatus
  {
    const arrayKeys = Object.keys(OrderStatus);
    const key = this.getRandomNumber(0, arrayKeys.length)

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