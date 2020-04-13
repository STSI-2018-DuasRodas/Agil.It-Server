import { User } from "./User";
import { DefaultObservation } from "./DefaultObservation";
import { DefaultOperation } from "./DefaultOperation";
import { MachineType } from "./MachineType";
import { DefectOrigin } from "./DefectOrigin";
import { DefectSymptom } from "./DefectSymptom";
import { Equipment } from "./Equipment";
import { Sector } from "./Sector";
import { InstallationArea } from "./InstallationArea";
import { MeasurementUnit } from "./MeasurementUnit";
import { Item } from "./Item";

export class Seeder {

  public static async Executar() : Promise<any> {
    await User.Seed();
    await DefaultObservation.Seed();
    await DefaultOperation.Seed();
    await MachineType.Seed();
    await DefectOrigin.Seed();
    await DefectSymptom.Seed();
    await Equipment.Seed();
    await Sector.Seed();
    await InstallationArea.Seed();
    await MeasurementUnit.Seed();
    await Item.Seed();
  }
}