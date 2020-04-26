import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { MachineType } from "./MachineType";
import { CrudClass } from "./CrudClass";

@Entity("defect_symptom")
export class DefectSymptom extends CrudClass {

  @ManyToOne(
    (type) => MachineType,
    (machineType) => machineType.id,
    { nullable: false },
  )
  @JoinColumn()
  public machineType: MachineType;

  constructor() {
    super();
  }

}