import { Entity, Column } from "typeorm";
import { CrudClass } from "./CrudClass";

@Entity("security_param")
export class SecurityParam extends CrudClass {

  @Column({nullable: true})
  private entityClass: string;

  @Column({ type: "int", nullable: true })
  private entityId: number;

  @Column()
  private useAlways: boolean;

  constructor() {
    super()
  }

  /**
   * Getter entityClass
   * @return {string}
   */
  public getEntityClass(): string {
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
   * @param {string} value
   */
  public setEntityClass(value: string) {
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