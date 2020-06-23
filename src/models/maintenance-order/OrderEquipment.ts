import { Equipment } from "../Equipment";
import { SuperiorEquipment } from "../SuperiorEquipment";
import { ManyToOne, Entity, OneToMany, JoinColumn, Column } from "typeorm";
import { OrderOperation } from "./OrderOperation";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { InstallationArea } from "../InstallationArea";
import { DefectSymptom } from "../DefectSymptom";
import { DefectOrigin } from "../DefectOrigin";
import { BaseClass } from "../BaseClass";
import { IsNotEmpty } from "class-validator";

@Entity('order_equipment')
export class OrderEquipment extends BaseClass {

  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.id, {cascade: false, nullable: true})
  @JoinColumn()
  @IsNotEmpty({
    message:'Ordem: Campo obrigatório.'
  })
  public maintenanceOrder : MaintenanceOrder = undefined;
  
  @ManyToOne( type => Equipment, equipment => equipment.id, {cascade: false, nullable: false})
  @JoinColumn()
  @IsNotEmpty({
    message:'Equipamento: Campo obrigatório.'
  })
  public equipment: Equipment = undefined;
  
  @ManyToOne(
    (type) => SuperiorEquipment,
    (superiorEquipment) => superiorEquipment.id,
    { nullable: true }
  )
  @JoinColumn()
  public superiorEquipment: SuperiorEquipment = undefined;

  @ManyToOne(
    (type) => InstallationArea,
    (installationArea) => installationArea.id,
    { nullable: false, cascade: false }
  )
  @JoinColumn()
  @IsNotEmpty({
    message:'Área da Instalação: Campo obrigatório.'
  })
  public installationArea: InstallationArea = undefined;
  
  @ManyToOne(
    (type) => DefectOrigin,
    (defectOrigin) => defectOrigin.id,
    { nullable: true }
  )
  @JoinColumn()
  public defectOrigin: DefectOrigin | undefined = undefined;

  @Column({
    type: 'varchar',
    length: '255'
  })
  public defectOriginNote: string = '';

  @ManyToOne(
    (type) => DefectSymptom,
    (defectSymptom) => defectSymptom.id,
    { nullable: true }
  )
  @JoinColumn()
  public defectSymptom: DefectSymptom | undefined = undefined;

  @Column({
    type: 'varchar',
    length: '255'
  })
  public defectSymptomNote: string = '';

  @OneToMany(type => OrderOperation, orderOperation => orderOperation.orderEquipment, {cascade: false, nullable: true})
  public orderOperation: Array<OrderOperation>;

  constructor() {
    super();
  }

}