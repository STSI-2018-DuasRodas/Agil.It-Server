import { Entity, Column } from "typeorm";
import { CrudClass } from "./CrudClass";
import { SecurityParamEntity } from "./enum/SecurityParamEntity";

@Entity("security_param")
export class SecurityParam extends CrudClass {

  @Column({nullable: true})
  public entityClass: SecurityParamEntity = undefined;

  @Column({ type: "int", nullable: true })
  public entityId: number = undefined;

  @Column()
  public useAlways: boolean = undefined;

  constructor() {
    super()
  }

}