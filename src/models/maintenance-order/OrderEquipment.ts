import { Equipment } from "../Equipment";
import { SuperiorEquipment } from "../SuperiorEquipment";
import { ManyToOne, Entity, OneToMany, JoinColumn } from "typeorm";
import { OrderOperation } from "./OrderOperation";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { InstallationArea } from "../InstallationArea";
import { BaseClass } from "../BaseClass";

@Entity('order_equipment')
export class OrderEquipment extends BaseClass {

  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.id, {cascade: false, nullable: true})
  @JoinColumn()
  public maintenanceOrder : MaintenanceOrder;
  
  @ManyToOne( type => Equipment, equipment => equipment.id, {cascade: false, nullable: false})
  @JoinColumn()
  public equipment: Equipment;
  
  @ManyToOne(
    (type) => SuperiorEquipment,
    (superiorEquipment) => superiorEquipment.id,
    { nullable: true }
  )
  @JoinColumn()
  public superiorEquipment: SuperiorEquipment;

  @ManyToOne(
    (type) => InstallationArea,
    (installationArea) => installationArea.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  public installationArea: InstallationArea;
  
  @OneToMany(type => OrderOperation, orderOperation => orderOperation.orderEquipment, {cascade: false, nullable: true})
  public orderOperation: Array<OrderOperation>;

  constructor() {
    super();
  }

}