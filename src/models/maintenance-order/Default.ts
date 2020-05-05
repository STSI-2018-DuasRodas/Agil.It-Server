import { ChildEntity, OneToMany, Column, ManyToOne, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { OrderEquipment } from "./OrderEquipment";
import { DefectOrigin } from "../DefectOrigin";
import { DefectSymptom } from "../DefectSymptom";

@ChildEntity()
export class Default extends MaintenanceOrder {

  constructor(
    defectOrigin: DefectOrigin | undefined = undefined,
    defectOriginNote: string | undefined = undefined,
    defectSymptom: DefectSymptom | undefined = undefined,
    defectSymptomNote: string | undefined = undefined,
  ) {
    super();
    this.defectOrigin = defectOrigin;
    this.defectOriginNote = defectOriginNote;
    this.defectSymptom = defectSymptom;
    this.defectSymptomNote = defectSymptomNote;
  }

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

}