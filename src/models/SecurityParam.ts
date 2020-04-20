import { Entity, Column } from "typeorm";
import { CrudClass } from "./CrudClass";
import { SecurityParamEntity } from "./enum/SecurityParamEntity";

@Entity("security_param")
export class SecurityParam extends CrudClass {

  @Column({nullable: true})
  private entityClass: SecurityParamEntity;

  @Column({ type: "int", nullable: true })
  private entityId: number;

  @Column()
  private useAlways: boolean;

  constructor() {
    super()
  }

  /**
   * Getter entityClass
   * @return {SecurityParamEntity}
   */
  public getEntityClass(): SecurityParamEntity {
    return this.entityClass;
  }

  /**
   * Getter entityId
   * @return {number}
   */
  public getEntityId(): number {
    return this.entityId;
  }

  /**
   * Setter entityClass
   * @param {SecurityParamEntity} value
   */
  public setEntityClass(value: SecurityParamEntity) {
    this.entityClass = value;
  }

  /**
   * Setter entityId
   * @param {number} value
   */
  public setEntityId(value: number) {
    this.entityId = value;
  }

  /**
   * Getter useAlways
   * @return {boolean}
   */
	public getUseAlways(): boolean {
		return this.useAlways;
	}

  /**
   * Setter useAlways
   * @param {boolean} value
   */
	public setUseAlways(value: boolean) {
		this.useAlways = value;
	}

}