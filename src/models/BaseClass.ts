import { CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseClass {

  @PrimaryGeneratedColumn()
  private id: number | undefined;

  @Column()
  private integrationID: string = '';

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

  constructor() {
  }

  /**
   * Setter Id
   * @param {number } id
   */
  public setId(id: number): void {
    this.id = id;
  }

  /**
   * Getter Id
   * @return {number }
   */
  public getId(): number | undefined {
    return this.id;
  }

  /**
   * Getter integrationID
   * @return {string }
   */
  public getIntegrationID(): string {
    return this.integrationID;
  }

  /**
   * Setter integrationID
   * @param {string } value
   */
  public setIntegrationID(value: string) {
    this.integrationID = value;
  }

  /**
   * Getter createdAt
   * @return {Date  | undefined }
   */
  public getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  /**
   * Getter createdBy
   * @return {number  | undefined }
   */
  public getCreatedBy(): number | undefined {
    return this.createdBy;
  }

  /**
   * Setter updatedAt
   * @param {Date } value
   */
  protected setUpdatedAt(value: Date) {
    this.updatedAt = value;
  }

  /**
   * Getter updatedAt
   * @return {Date | undefined }
   */
  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  /**
   * Setter updatedBy
   * @param {number } value
   */
  protected setUpdatedBy(value: number) {
    this.updatedBy = value;
  }

  /**
   * Getter updatedBy
   * @return {number | undefined }
   */
  public getUpdatedBy(): number | undefined {
    return this.updatedBy;
  }

  /**
   * Setter deleted
   * @param {boolean } value
   */
  protected setDeleted(value: boolean) {
    this.deleted = value;
  }

  /**
   * Getter deleted
   * @return {boolean }
   */
  public getDeleted(): boolean {
    return this.deleted;
  }

}