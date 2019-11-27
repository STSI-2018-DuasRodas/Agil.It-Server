import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Sector } from "./Sector";
import { CrudClass } from "./CrudClass";

@Entity("installation_area")
export class InstallationArea extends CrudClass {

  @ManyToOne(
    (type) => Sector,
    (sector) => sector.getId,
    { nullable: false },
  )
  @JoinColumn()
  private sector: Sector;

  constructor() {
    super();
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
}