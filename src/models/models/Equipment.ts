import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";
import { MachineType } from "./MachineType";

@Entity("equipment")
export class Equipment {

  @PrimaryGeneratedColumn()
  private id: number | undefined;

  @Column()
  private integrationID: string = '';

  @Column()
  private description: string = '';

  @OneToOne(
    (type) => MachineType,
    (machineType) => machineType.getId,
    { nullable: false },
  )
  @JoinColumn()
  private machineType: MachineType = new MachineType();

  @CreateDateColumn()
  private createdAt: Date | undefined;

  @OneToOne(
    (type) => User,
    (user) => user.getId,
    { nullable: false },
  )
  @JoinColumn()
  private createdBy: User | undefined

  @UpdateDateColumn()
  private updatedAt: Date | undefined;

  @OneToOne(
    (type) => User,
    (user) => user.getId,
    { nullable: false },
  )
  @JoinColumn()
  private updatedBy: User | undefined

  @Column({
    type: Boolean,
    default: false
  })
  private deleted : boolean = false

  constructor() {

  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getDescription(): string {
    return this.description;
  }

  public setIntegrationID(integrationID: string): void {
    this.integrationID = integrationID;
  }

  public getIntegrationID(): string {
    return this.integrationID;
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

  public getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  public getCreatedBy(): User | undefined {
    return this.createdBy;
  }

  public getUpdatedBy(): User | undefined {
    return this.updatedBy;
  }

  /**
   * Getter deleted
   * @return {boolean }
   */
	public getDeleted(): boolean  {
		return this.deleted;
	}

  /**
   * Setter deleted
   * @param {boolean } value
   */
	public setDeleted(value: boolean ) {
		this.deleted = value;
	}

}