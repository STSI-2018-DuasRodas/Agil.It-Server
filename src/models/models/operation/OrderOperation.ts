import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { User } from "../User";

@Entity("maintenance_order_operation")
export abstract class OrderOperation {
  
  @PrimaryGeneratedColumn()
  private id            : number|undefined;

  @Column()
  private description   : string = '';
  
  @CreateDateColumn()
  private createdAt   : Date|undefined;

  
  @OneToOne(
    (type) => User,
    (user) => user.getId,
    { nullable: false },
  )
  @JoinColumn()
  private createdBy: User | undefined

  @UpdateDateColumn()
  private updatedAt   : Date | undefined;

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

  constructor(){

  }

  public setId(id : number) : void {
    this.id = id;
  }

  public getId() : number|undefined {
    return this.id;
  }

  public setDescription(description : string) : void {
    this.description = description;
  }

  public getDescription() : string {
    return this.description;
  }
  
  public getCreatedAt() : Date|undefined {
    return this.createdAt;
  }

  public getUpdatedAt() : Date|undefined {
    return this.updatedAt;
  }

  public getCreatedBy() : User|undefined {
    return this.createdBy;
  }

  public getUpdatedBy() : User|undefined {
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