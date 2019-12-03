import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { MachineType } from "./MachineType";
import { CrudClass } from "./CrudClass";

@Entity("defect_origin")
export class DefectOrigin extends CrudClass {

  @ManyToOne(
    (type) => MachineType,
    (machineType) => machineType.getId,
    { nullable: false },
  )
  @JoinColumn({name: "machineTypeId"})
  private machineType: MachineType;

  constructor() {
    super();
  }

  /**
   * Getter machineType
   * @return {MachineType }
   */
	public getMachineType(): MachineType  {
		return this.machineType;
	}

  /**
   * Setter machineType
   * @param {MachineType } value
   */
	public setMachineType(value: MachineType ) {
		this.machineType = value;
	}

}