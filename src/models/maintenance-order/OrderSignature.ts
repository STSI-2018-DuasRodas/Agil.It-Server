import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { MaintenanceOrder } from "./MaintenanceOrder";
import { SignatureRole } from "../enum/SignatureRole";
import { User } from "../User";
import { SignatureStatus } from "../enum/SignatureStatus";

@Entity("order_signature")
export class OrderSignature {

  @PrimaryGeneratedColumn("uuid")
  public id: any;

  @ManyToOne(type => User, user => user.id)
  public user: User;

  @ManyToOne(type => MaintenanceOrder, maintenanceOrder => maintenanceOrder.id)
  @JoinColumn()
  public maintenanceOrder: MaintenanceOrder;

  @Column({
    type: "enum",
    enum: SignatureRole,
    nullable: false
  })
  public signatureRole: SignatureRole;

  @Column({
    type: "enum",
    enum: SignatureStatus,
    default: SignatureStatus.NEW
  })
  public signatureStatus: SignatureStatus;

  @Column({
    type: 'varchar',
    length: '255'
  })
  public note: string;

  @CreateDateColumn()
  public createdAt: Date | undefined;

  @Column()
  public createdBy: number | undefined;

  @UpdateDateColumn()
  public updatedAt: Date | undefined;

  @Column()
  public updatedBy: number | undefined;

  @Column({
    type: Boolean,
    default: false
  })
  public deleted: boolean = false;
 
}