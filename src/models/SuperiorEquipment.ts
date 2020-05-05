import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { InstallationArea } from "./InstallationArea";
import { CrudClass } from "./CrudClass";

@Entity("superior_equipment")
export class SuperiorEquipment extends CrudClass {

  @ManyToOne(
    (type) => InstallationArea,
    (installationArea) => installationArea.id,
    { nullable: false }
  )
  @JoinColumn()
  public installationArea: InstallationArea = undefined;

  constructor() {
    super();
  }

}