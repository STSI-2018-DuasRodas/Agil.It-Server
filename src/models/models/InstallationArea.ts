import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";
import { Sector } from "./Sector";

@Entity("installation_area")
export class InstallationArea {

  @PrimaryGeneratedColumn()
  private id: number | undefined;

  @Column()
  private integrationID: string = '';

  @Column()
  private description: string = '';

  @OneToOne(
    (type) => Sector,
    (sector) => sector.getId,
    { nullable: false },
  )
  @JoinColumn()
  private sector: Sector = new Sector();

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
   * Getter sector
   * @return {Sector }
   */
	public getSector(): Sector  {
		return this.sector;
	}

  /**
   * Setter sector
   * @param {Sector } value
   */
	public setSector(value: Sector ) {
		this.sector = value;
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