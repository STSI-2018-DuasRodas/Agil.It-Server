import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { MachineType } from "./MachineType";
import { CrudClass } from "./CrudClass";

@Entity("equipment")
export class Equipment extends CrudClass {

  @ManyToOne(
    (type) => MachineType,
    (machineType) => machineType.id,
    { nullable: false },
  )
  @JoinColumn()
  public machineType: MachineType = undefined;

  constructor() {
    super();
  }

}