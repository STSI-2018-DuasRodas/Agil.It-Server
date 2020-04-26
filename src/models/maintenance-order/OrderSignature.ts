import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { SignatureRole } from "../enum/SignatureRole";
import { User } from "../User";
import { SignatureStatus } from "../enum/SignatureStatus";

@Entity("order_signature")
export class OrderSignature {

  @PrimaryGeneratedColumn("uuid")
  private id: any;

  @ManyToOne(type => User, user => user.getId)
  private user: User;

  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.getId)
  @JoinColumn()
  private maintenanceOrder: MaintenanceOrder;

  @Column({
    type: "enum",
    enum: SignatureRole,
    nullable: false
  })
  private signatureRole: SignatureRole;

  @Column({
    type: "enum",
    enum: SignatureStatus,
    default: SignatureStatus.NEW
  })
  private signatureStatus: SignatureStatus;

  @Column({
    type: 'varchar',
    length: '255'
  })
  private note: string;

  @CreateDateColumn()
  private createdAt: Date | undefined;

  @Column()
  private createdBy: number | undefined;

  @UpdateDateColumn()
  private updatedAt: Date | undefined;

  @Column()
  private updatedBy: number | undefined;

  @Column({
    type: Boolean,
    default: false
  })
  private deleted: boolean = false;

  /**
   * Getter id
   * @return {any}
   */
  public getId(): any {
    return this.id;
  }

  /**
   * Getter user
   * @return {User}
   */
  public getUser(): User {
    return this.user;
  }

  /**
   * Getter maintenanceOrder
   * @return {MaintenanceOrder}
   */
  public getMaintenanceOrder(): MaintenanceOrder {
    return this.maintenanceOrder;
  }

  /**
   * Getter signatureRole
   * @return {SignatureRole}
   */
  public getSignatureRole(): SignatureRole {
    return this.signatureRole;
  }

  /**
   * Getter signatureStatus
   * @return {SignatureStatus}
   */
  public getSignatureStatus(): SignatureStatus {
    return this.signatureStatus;
  }

  /**
   * Getter note
   * @return {string}
   */
  public getNote(): string {
    return this.note;
  }

  /**
   * Getter createdAt
   * @return {Date }
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Getter createdBy
   * @return {number }
   */
	public getCreatedBy(): number  {
		return this.createdBy;
	}

  /**
   * Getter updatedAt
   * @return {Date }
   */
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  /**
   * Getter updatedBy
   * @return {number }
   */
	public getUpdatedBy(): number  {
		return this.updatedBy;
	}

  /**
   * Getter deleted
   * @return {boolean }
   */
  public getDeleted(): boolean {
    return this.deleted;
  }

  /**
   * Setter id
   * @param {any} value
   */
  public setId(value: any) {
    this.id = value;
  }

  /**
   * Setter user
   * @param {User} value
   */
  public setUser(value: User) {
    this.user = value;
  }

  /**
   * Setter maintenanceOrder
   * @param {MaintenanceOrder} value
   */
  public setMaintenanceOrder(value: MaintenanceOrder) {
    this.maintenanceOrder = value;
  }

  /**
   * Setter signatureRole
   * @param {SignatureRole} value
   */
  public setSignatureRole(value: SignatureRole) {
    this.signatureRole = value;
  }

  /**
   * Setter signatureStatus
   * @param {SignatureStatus} value
   */
  public setSignatureStatus(value: SignatureStatus) {
    this.signatureStatus = value;
  }

  /**
   * Setter note
   * @param {string} value
   */
  public setNote(value: string) {
    this.note = value;
  }

  /**
   * Setter createdAt
   * @param {Date } value
   */
  public setCreatedAt(value: Date) {
    this.createdAt = value;
  }

  /**
   * Setter createdBy
   * @param {number } value
   */
	public setCreatedBy(value: number ) {
		this.createdBy = value;
	}

  /**
   * Setter updatedAt
   * @param {Date } value
   */
  public setUpdatedAt(value: Date) {
    this.updatedAt = value;
  }

  /**
   * Setter updatedBy
   * @param {number } value
   */
	public setUpdatedBy(value: number ) {
		this.updatedBy = value;
	}

  /**
   * Setter deleted
   * @param {boolean } value
   */
  public setDeleted(value: boolean) {
    this.deleted = value;
  }
  
}