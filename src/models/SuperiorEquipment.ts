import { Entity, JoinColumn, OneToOne } from "typeorm";
import { InstallationArea } from "./InstallationArea";
import { CrudClass } from "./CrudClass";

@Entity("superior_equipment")
export class SuperiorEquipment extends CrudClass {

  @OneToOne(
    (type) => InstallationArea,
    (installationArea) => installationArea.getId,
    { nullable: false }
  )
  @JoinColumn()
  private installationArea: InstallationArea;

  constructor() {
    super();
  }

  /**
   * Getter installationArea
   * @return {InstallationArea }
   */
	public getInstallationArea(): InstallationArea  {
		return this.installationArea;
	}

  /**
   * Setter installationArea
   * @param {InstallationArea } value
   */
	public setInstallationArea(value: InstallationArea ) {
		this.installationArea = value;
	}

}