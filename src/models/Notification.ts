import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { NotificatoinStatus } from "./NotificatoinStatus";

@Entity("notification")
export class Notification {
  
  @PrimaryGeneratedColumn("uuid")
  private id: any;

  @Column()
  private description: string;

  @Column()
  private icon: string;

  @Column()
  artefact: string;
  
  @Column()
  artefactId: string;

  @Column({
    type: "enum",
    enum: NotificatoinStatus,
    default: NotificatoinStatus.NEW
  })
  status: NotificatoinStatus;

  @CreateDateColumn()
  private createdAt: Date | undefined;

  @UpdateDateColumn()
  private updatedAt: Date | undefined;

  /**
   * Getter id
   * @return {any}
   */
	public getId(): any {
		return this.id;
	}

  /**
   * Getter description
   * @return {string}
   */
	public getDescription(): string {
		return this.description;
	}

  /**
   * Getter icon
   * @return {string}
   */
	public getIcon(): string {
		return this.icon;
	}

  /**
   * Setter description
   * @param {string} value
   */
	public setDescription(value: string) {
		this.description = value;
	}

  /**
   * Setter icon
   * @param {string} value
   */
	public setIcon(value: string) {
		this.icon = value;
  }

  /**
   * Getter createdAt
   * @return {Date }
   */
	public getCreatedAt(): Date  {
		return this.createdAt;
	}

  /**
   * Getter updatedAt
   * @return {Date }
   */
	public getUpdatedAt(): Date  {
		return this.updatedAt;
	}
  

}