import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { NotificatoinStatus } from "./enum/NotificatoinStatus";
import { User } from "./User";

@Entity("notification")
export class Notification {
  
  @PrimaryGeneratedColumn("uuid")
  private id: any;

  @Column()
  private title: string;

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

  @ManyToOne(type => User, user => user.getId)
  private user: User;

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

    /**
     * Getter title
     * @return {string}
     */
	public getTitle(): string {
		return this.title;
	}

  /**
   * Setter title
   * @param {string} value
   */
	public setTitle(value: string) {
		this.title = value;
  }

  /**
   * Getter user
   * @return {User}
   */
	public getUser(): User {
		return this.user;
	}

  /**
   * Setter user
   * @param {User} value
   */
	public setUser(value: User) {
		this.user = value;
	}

  
}