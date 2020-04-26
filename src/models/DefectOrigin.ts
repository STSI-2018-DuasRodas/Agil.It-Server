import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { MachineType } from "./MachineType";
import { CrudClass } from "./CrudClass";

@Entity("defect_origin")
export class DefectOrigin extends CrudClass {

  @ManyToOne(
    (type) => MachineType,
    (machineType) => machineType.id,
    { nullable: false },
  )
  @JoinColumn({ name: "machineTypeId" })
  public machineType: MachineType;

  constructor() {
    super();
  }

}