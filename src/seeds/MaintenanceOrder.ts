import { WorkCenter } from './../models/WorkCenter';
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
import { OrderLayoutController } from '../controllers/OrderLayout';
import { MaintenanceWorker } from '../models/maintenance-order/MaintenanceWorker';
import { Item } from '../models/Item';
import { ItemController } from '../controllers/Item';
import { EquipmentController } from '../controllers/Equipment';
import { SuperiorEquipmentController } from '../controllers/SuperiorEquipment';
import { InstallationAreaController } from '../controllers/InstallationArea';
import { OrderOperation } from '../models/maintenance-order/OrderOperation';
import { DefaultObservationController } from '../controllers/DefaultObservation';
import { UserController } from '../controllers/User';
import { DefectOriginController } from '../controllers/DefectOrigin';
import { DefectSymptomController } from '../controllers/DefectSymptom';
import { DefectSymptom } from '../models/DefectSymptom';
import { DefectOrigin } from '../models/DefectOrigin';
import { WorkedTime } from '../models/maintenance-order/WorkedTime';
import { WorkedTimeController } from '../controllers/WorkedTime';
import { User } from '../models/User';
import { WorkCenterController } from '../controllers/WorkCenter';

export class MaintenanceOrder extends Seed {

  public static async Seed(log: Boolean = true) {
    const maintenanceOrder = new MaintenanceOrder(MaintenanceOrderController);
    await maintenanceOrder.Executar(log);
  }

  public async Mock() {
  
    for (let i = 0; i < 200; i++) {
      await MaintenanceOrder.CreateOrder();
    }

  }

  public static async CreateOrder() {

    const order = await MaintenanceOrder.GenerateOrder();

    const controller = new MaintenanceOrderController();

    const savedOrder = await controller.saveOrder(order)


    if(Array.isArray(savedOrder.maintenanceWorker) && savedOrder.maintenanceWorker.length) {
      savedOrder.maintenanceWorker.forEach((maintenanceWorker: MaintenanceWorker) => {
        this.CreateWorkedTime(maintenanceWorker);
      });
    }
  }

  public static async GenerateOrder() {
    const orderNumber: string = this.getOrderNumber(await this.ObterOrderId());
    const layoutId: number = this.getRandomNumber(1,4);
    const priority: OrderPriority = this.getRandomOrderPriority();
    const status: OrderStatus = this.getRandomOrderStatus();
    const exported: boolean = false;
    const openedDate: Date = this.getRandomDate(2020);
    const description: string = this.getRandomDescription()
    const createdBy: number = 5;
    const updatedBy: number = 5;
    const solicitationUserId: number = 6;
    const workCenterId: number = this.getRandomNumber(1,6);

    const layout: OrderLayout = await this.getOrderLayout(layoutId);

    let order: Model;

    if (layout.orderLayout === EnumOrderLayout.DEFAULT) {
      order = new Default();

    } else if(layout.orderLayout === EnumOrderLayout.LIST) {
      order = new List();

    } else {
      order = new Route();
    }

    order.orderNumber = orderNumber;
    order.orderLayout = layout;
    order.createdBy = createdBy;
    order.updatedBy = updatedBy;
    order.exported = exported;
    order.openedDate = openedDate;
    order.orderStatus = status;
    order.priority = priority;
    order.description = description;

    const solicitationUser: User = await this.getUser(solicitationUserId);
    const workCenter: WorkCenter = await this.getWorkCenter(workCenterId);
    
    order.workCenter = workCenter
    order.solicitationUser = solicitationUser;
    
    order.maintenanceWorker = await MaintenanceOrder.GenerateWorkers();
    order.orderEquipment = await MaintenanceOrder.GenerateOrderEquipment(order.orderLayout.orderLayout);
    order.maintenanceWorker = await MaintenanceOrder.GenerateWorkers();
    
    if (Array.isArray(order.maintenanceWorker) && order.maintenanceWorker.length) {
      if (order.orderStatus === OrderStatus.CREATED) {
        order.orderStatus = OrderStatus.ASSUMED;
      }
    } else {
      order.orderStatus = OrderStatus.CREATED;
    }

    return order;
  }

  public static async loadOrderComponents() {
    const componentsQty: number = this.getRandomNumber(0,3);
    const components = [];

    for (let i = 0; i < componentsQty; i++) {
      components.push(await this.CreateOrderComponent());
    }

    return components;
  }
  
  public static async GenerateOrderEquipment(orderLayout: EnumOrderLayout) {
    let equipmentQty: number = this.getRandomNumber(1,3);
    const equipments = [];

    if (orderLayout === EnumOrderLayout.DEFAULT) {
      equipmentQty = 1;
    }

    for (let i = 0; i < equipmentQty; i++) {
      equipments.push(await this.CreateOrderEquipment());
    }

    return equipments;
  }

  public static async GenerateWorkers() {
    const workersQty: number = this.getRandomNumber(0,3);
    const workers = [];

    if (!workersQty) return workers;

    workers.push(await this.CreateWorker(true, 1));

    return workers;
  }
  
  public static async CreateOrderComponent(): Promise<any> {

    const itemId: number = this.getRandomNumber(1,3);
    const quantity: number = this.getRandomNumber(1,10);
    const canBeDeleted: boolean = this.getRandomBoolean();
    
    const item: Item = await this.getItem(itemId);

    const orderComponent = new OrderComponent();
    orderComponent.canBeDeleted = canBeDeleted;
    orderComponent.item = item;
    orderComponent.quantity = quantity;

    return orderComponent;
  }
  
  public static async CreateOrderEquipment(): Promise<any> {

    const equipmentId: number = this.getRandomNumber(1,3);
    const superiorEquipmentId: number = this.getRandomNumber(1,3);
    const installationAreaId: number = this.getRandomNumber(1,3);
    const needStopping: boolean = this.getRandomBoolean();
    const isStopped: boolean = this.getRandomBoolean();

    const equipment = await this.getEquipment(equipmentId)
    const superiorEquipment = await this.getSuperiorEquipment(superiorEquipmentId)
    const installationArea = await this.getInstallationArea(installationAreaId)


    const defectSymptomId: number = this.getRandomNumber(1,3);
    const defectOriginId: number = this.getRandomNumber(1,3);

    const defectOrigin: DefectOrigin = await this.getDefectOrigin(defectOriginId);
    const defectSymptom: DefectSymptom = await this.getDefectSymptom(defectSymptomId);
    
    
    const orderEquipment = new OrderEquipment();

    orderEquipment.equipment = equipment;
    orderEquipment.installationArea = installationArea;
    orderEquipment.superiorEquipment = superiorEquipment;
    orderEquipment.isStopped = isStopped;
    orderEquipment.needStopping = needStopping;

    orderEquipment.defectOrigin=defectOrigin;
    orderEquipment.defectSymptom=defectSymptom;

    orderEquipment.orderOperation = await this.loadOrderOperations();

    return orderEquipment;
  }

  public static async loadOrderOperations(): Promise<any> {
    const operationsQty: number = this.getRandomNumber(0,3);
    const operations = [];

    for (let i = 0; i < operationsQty; i++) {
      operations.push(await this.CreateOperation(i+1));
    }

    return operations;
  }
  
  public static async CreateOperation(operationNumber: number): Promise<any> {

    const planningTime:number = this.getRandomNumber(15,300);
    let executeTime:number = this.getRandomNumber(0,(planningTime * 1.5));
    const executed = ((executeTime/planningTime) >= 0.85)  // Ter feito pelo menos 85% do trabalho
    const description: string = this.getRandomDescription()
    const defaultObservationId: number = this.getRandomNumber(1,3);
    let isDisapproved = false;

    if (!executed) executeTime = 0;
    else isDisapproved = this.getRandomBoolean();

    const defaultObservation = await this.getDefaultObservation(defaultObservationId)

    const operation = new OrderOperation();

    operation.planningTime = planningTime;
    operation.executeTime = executeTime;
    operation.executed = executed;
    operation.operationNumber = operationNumber;
    operation.defaultObservation = defaultObservation;
    operation.description = description;
    operation.isDisapproved = isDisapproved;

    operation.orderComponent = await this.loadOrderComponents();

    return operation;
  }

  public static async CreateWorker(isMain: boolean, id?: number): Promise<any> {
    
    const userId: number = id || this.getRandomNumber(1,4);
    const isActive: boolean = isMain ? true : this.getRandomBoolean()

    const user = await this.getUser(userId);

    const maintenanceWorker = new MaintenanceWorker();
    maintenanceWorker.user = user;
    maintenanceWorker.isActive = isActive;
    maintenanceWorker.isMain = isMain;

    return maintenanceWorker;
  }

  public static async CreateWorkedTime(maintenanceWorker: MaintenanceWorker): Promise<any> {
    const workedTime = new WorkedTime();

    const date = this.getRandomDate(2020)
    const started = this.getRandomNumber(3600000, 30000000)
    const finished = this.getRandomNumber(started, started + 30000000)
    const createdBy: number = maintenanceWorker.user.id;
    const updatedBy: number = maintenanceWorker.user.id;

    workedTime.maintenanceWorker = maintenanceWorker;
    workedTime.startedWork = new Date(date.getTime() + started)
    workedTime.finishedWork = new Date(date.getTime() + finished)
    workedTime.intervalTime = (finished - started) <  10000000 ? 0 : this.arredondarEmCinco(Math.trunc(this.getRandomNumber(100,300)/5));
    workedTime.createdBy = createdBy;
    workedTime.updatedBy = updatedBy;

    workedTime.description = `Trabalhado na manutenção das ${workedTime.startedWork.getHours()}:${workedTime.startedWork.getMinutes()} até às ${workedTime.finishedWork.getHours()}:${workedTime.finishedWork.getMinutes()}.`

    const controller = new WorkedTimeController();
    await controller.saveEntity(workedTime);
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
  
  public static async getWorkCenter(workCenterId: number): Promise<any> {
    const controller = new WorkCenterController();
    return await controller.getRepositoryEntity().findOne(workCenterId);
  }

  public static async getDefectOrigin(defectOriginId): Promise<any> {
    const controller = new DefectOriginController();
    return await controller.getRepositoryEntity().findOne(defectOriginId);
  }
  
  public static async getDefectSymptom(defectSymptomId): Promise<any> {
    const controller = new DefectSymptomController();
    return await controller.getRepositoryEntity().findOne(defectSymptomId);
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
    const arrayValues = Object.values(OrderPriority);
    const index = this.getRandomNumber(0, arrayValues.length - 1)

    return arrayValues[index];
  }
  
  public static getRandomOrderStatus(): OrderStatus
  {
    const arrayValues = Object.values(OrderStatus);
    const index = this.getRandomNumber(0, arrayValues.length - 3) // -3 para ignorar situação finalizada e assinada

    return arrayValues[index];
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

    const offset = this.getRandomNumber(1,(endDate-initDate));
    
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

  public static arredondarEmCinco(valor: number) {

    while(valor%5 !== 0) {
      valor++
    }

    return valor;
  }
}