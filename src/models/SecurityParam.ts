import { Entity, Column } from "typeorm";
import { CrudClass } from "./CrudClass";
import { SecurityParamEntity } from "./enum/SecurityParamEntity";

@Entity("security_param")
export class SecurityParam extends CrudClass {

  @Column({nullable: true})
  public entityClass: SecurityParamEntity;

  @Column({ type: "int", nullable: true })
  public entityId: number;

  @Column()
  public useAlways: boolean;

  constructor() {
    super()
  }

}