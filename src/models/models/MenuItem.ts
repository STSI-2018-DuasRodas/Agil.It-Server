import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { UserRole } from "../enum/UserRole";

@Entity("menu_item")
export class MenuItem {

  @PrimaryGeneratedColumn()
  private id : number|undefined;

  @Column()
  private title : string = '';

  @Column()
  private tooltip : string = '';

  @Column()
  private icon : string = '';

  @Column("simple-array")
  private access : Array<UserRole> = [];

  @Column()
  private actionWeb : string = '';

  @Column()
  private actionMobile : string = '';

  @Column({
    type: Boolean,
    default: false
  })
  private deleted : boolean = false

  constructor() {

  }
  
  /**
   * Getter id
   * @return {number}
   */
	public getId(): number|undefined {
		return this.id;
	}

  /**
   * Getter title
   * @return {string }
   */
	public getTitle(): string  {
		return this.title;
	}

  /**
   * Getter tooltip
   * @return {string }
   */
	public getTooltip(): string  {
		return this.tooltip;
	}

  /**
   * Getter icon
   * @return {string }
   */
	public getIcon(): string  {
		return this.icon;
	}

  /**
   * Getter access
   * @return {Array<UserRole> }
   */
	public getAccess(): Array<UserRole>  {
		return this.access;
	}

  /**
   * Getter actionWeb
   * @return {string }
   */
	public getActionWeb(): string  {
		return this.actionWeb;
	}

  /**
   * Getter actionMobile
   * @return {string }
   */
	public getActionMobile(): string  {
		return this.actionMobile;
	}

  /**
   * Setter id
   * @param {number} value
   */
	public setId(value: number) {
		this.id = value;
	}

  /**
   * Setter title
   * @param {string } value
   */
	public setTitle(value: string ) {
		this.title = value;
	}

  /**
   * Setter tooltip
   * @param {string } value
   */
	public setTooltip(value: string ) {
		this.tooltip = value;
	}

  /**
   * Setter icon
   * @param {string } value
   */
	public setIcon(value: string ) {
		this.icon = value;
	}

  /**
   * Setter access
   * @param {Array<UserRole> } value
   */
	public setAccess(value: Array<UserRole> ) {
		this.access = value;
	}

  /**
   * Setter actionWeb
   * @param {string } value
   */
	public setActionWeb(value: string ) {
		this.actionWeb = value;
	}

  /**
   * Setter actionMobile
   * @param {string } value
   */
	public setActionMobile(value: string ) {
		this.actionMobile = value;
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