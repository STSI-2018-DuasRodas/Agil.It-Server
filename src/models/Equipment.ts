import { Entity, JoinColumn, OneToOne } from "typeorm";
import { MachineType } from "./MachineType";
import { CrudClass } from "./CrudClass";

@Entity("equipment")
export class Equipment extends CrudClass {

  @OneToOne(
    (type) => MachineType,
    (machineType) => machineType.getId,
    { nullable: false },
  )
  @JoinColumn()
  private machineType: MachineType = new MachineType();

  constructor() {
    super();
  }

  /**
   * Getter machineType
   * @return {MachineType }
   */
  public getMachineType(): MachineType {
    return this.machineType;
  }

  /**
   * Setter machineType
   * @param {MachineType } value
   */
  public setMachineType(value: MachineType) {
    this.machineType = value;
  }

}