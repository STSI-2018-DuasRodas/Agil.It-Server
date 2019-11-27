import { UserCollection } from './routes/User'
import { SectorCollection } from './routes/Sector'
import { Collection } from './routes/Collection'
import { NotificationCollection } from './routes/Notification';
import { MenuItemCollection } from './routes/MenuItem';
import { DefaultObservationCollection } from './routes/DefaultObservation';
import { DefaultOperationCollection } from './routes/DefaultOperations';
import { DefectOriginCollection } from './routes/DefectOrigin';
import { DefectSymptomCollection } from './routes/DefectSymptom';
import { EquipmentCollection } from './routes/Equipment';
import { InstallationAreaCollection } from './routes/InstallationArea';
import { ItemCollection } from './routes/Item';
import { MachineTypeCollection } from './routes/MachineType';
import { MeasurementUnitCollection } from './routes/MeasurementUnit';
import { OrderClassificationCollection } from './routes/OrderClassification';
import { OrderLayoutCollection } from './routes/OrderLayout';
import { OrderTypeCollection } from './routes/OrderType';
import { WorkCenterCollection } from './routes/WorkCenter';
import { SecurityParamCollection } from './routes/SecurityParam';
import { MachineComponentCollection } from './routes/MachineComponent';
import { SuperiorEquipmentCollection } from './routes/SuperiorEquipment';
import { MaintenanceOrderCollection } from './routes/MaintenanceOrder';
import { MaintenanceWorkerCollection } from './routes/MaintenanceWorker';
import { OrderComponentCollection } from './routes/OrderComponent';
import { OrderEquipmentCollection } from './routes/OrderEquipment';
import { OrderOperationCollection } from './routes/OrderOperation';
import { OrderSafetyParamsCollection } from './routes/OrderSafetyParams';
import { OrderSignatureCollection } from './routes/OrderSignature';
import { WorkedTimeCollection } from './routes/WorkedTime';
import { WorkerRequestCollection } from './routes/WorkerRequest';

export class Routes {
  private collections : Array<Collection>;

  constructor() {
    this.collections = [];

    this.addCollection(new DefaultObservationCollection())
    this.addCollection(new DefaultOperationCollection())
    this.addCollection(new DefectOriginCollection())
    this.addCollection(new DefectSymptomCollection())
    this.addCollection(new EquipmentCollection())
    this.addCollection(new InstallationAreaCollection())
    this.addCollection(new ItemCollection())
    this.addCollection(new MachineComponentCollection())
    this.addCollection(new MachineTypeCollection())
    this.addCollection(new MaintenanceOrderCollection())
    this.addCollection(new MaintenanceWorkerCollection())
    this.addCollection(new MeasurementUnitCollection())
    this.addCollection(new MenuItemCollection())
    this.addCollection(new NotificationCollection())
    this.addCollection(new OrderClassificationCollection())
    this.addCollection(new OrderComponentCollection())
    this.addCollection(new OrderEquipmentCollection())
    this.addCollection(new OrderLayoutCollection())
    this.addCollection(new OrderOperationCollection())
    this.addCollection(new OrderSafetyParamsCollection())
    this.addCollection(new OrderSignatureCollection())
    this.addCollection(new OrderTypeCollection())
    this.addCollection(new SectorCollection())
    this.addCollection(new SecurityParamCollection())
    this.addCollection(new SuperiorEquipmentCollection())
    this.addCollection(new UserCollection())
    this.addCollection(new WorkCenterCollection())
    this.addCollection(new WorkedTimeCollection())
    this.addCollection(new WorkerRequestCollection())
  }

  public getCollections(): Array<Collection> {
	return this.collections;
  }
    
  public addCollection(value: Collection) {
	this.collections.push(value);
  }
  
}
