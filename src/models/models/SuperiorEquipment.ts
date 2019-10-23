import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";
import { InstallationArea } from "./InstallationArea";

@Entity("superior_equipment")
export class SuperiorEquipment {

  @PrimaryGeneratedColumn()
  private id: number | undefined;

  @Column()
  private integrationID: string = '';

  @Column()
  private description: string = '';

  @OneToOne(
    (type) => InstallationArea,
    (installationArea) => installationArea.getId,
    { nullable: false },
  )
  @JoinColumn()
  private installationArea: InstallationArea = new InstallationArea();

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
   * Getter installationArea
   * @return {InstallationArea }
   */
	public getInstallationArea(): InstallationArea  {
		return this.installationArea;
	}

  /**
   * Setter installationArea
   * @param {InstallationArea } value
   */
	public setInstallationArea(value: InstallationArea ) {
		this.installationArea = value;
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