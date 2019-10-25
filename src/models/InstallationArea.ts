import { Entity, JoinColumn, OneToOne } from "typeorm";
import { Sector } from "./Sector";
import { CrudClass } from "./CrudClass";

@Entity("installation_area")
export class InstallationArea extends CrudClass {

  @OneToOne(
    (type) => Sector,
    (sector) => sector.getId,
    { nullable: false },
  )
  @JoinColumn()
  private sector: Sector = new Sector();

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