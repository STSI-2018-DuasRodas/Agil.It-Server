import { Entity, JoinColumn, ManyToOne, Column } from "typeorm";
import { MachineType } from "./MachineType";
import { CrudClass } from "./CrudClass";
import { IsNotEmpty } from "class-validator";

@Entity("equipment")
export class Equipment extends CrudClass {

  @Column({ nullable: false})
  @IsNotEmpty({
    message:'Código do Equipamento: Campo obrigatório.'
  })
  code: string = ""

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