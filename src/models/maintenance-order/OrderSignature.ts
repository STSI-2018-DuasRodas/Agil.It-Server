import { UserRole } from './../enum/UserRole';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { SignatureRole } from "../enum/SignatureRole";
import { User } from "../User";
import { SignatureStatus } from "../enum/SignatureStatus";

@Entity("order_signature")
export class OrderSignature {

  @PrimaryGeneratedColumn("uuid")
  public id: any = undefined;

  @ManyToOne(type => User, user => user.id)
  public user: User = undefined;

  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.id)
  @JoinColumn()
  public maintenanceOrder: MaintenanceOrder = undefined;

  @Column({
    type: "simple-enum",
    enum: SignatureRole,
    nullable: false
  })
  public signatureRole: SignatureRole = undefined;

  @Column({
    type: "simple-enum",
    enum: SignatureStatus,
    default: SignatureStatus.NEW
  })
  public signatureStatus: SignatureStatus = undefined;

  @Column({
    type: 'varchar',
    length: '255'
  })
  public note: string = '';

  @CreateDateColumn()
  public createdAt: Date | undefined = undefined;

  @Column()
  public createdBy: number | undefined = undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined = undefined;

  @Column()
  public updatedBy: number | undefined = undefined;

  @Column({
    type: Boolean,
    default: false
  })
  public deleted: boolean = false;
 
  /**
   * getUserRole
   */
  public getUserRole(role: UserRole): SignatureRole {
    if (role === UserRole.MAINTAINER) {
      return SignatureRole.MAINTAINER
    }

    if (role === UserRole.ADMINISTRATOR) {
      return SignatureRole.ADMINISTRATOR
    }

    return SignatureRole.LEADER;
  }
}