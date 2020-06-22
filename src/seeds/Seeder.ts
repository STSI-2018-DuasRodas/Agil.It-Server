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
import { OrderLayout } from "./OrderLayout";
import { SecurityParam } from "./SecurityParam";
import { SuperiorEquipment } from "./SuperiorEquipment";
import { WorkCenter } from "./WorkCenter";
import { MaintenanceOrder } from "./MaintenanceOrder";

export class Seeder {

  public static async Executar(log: Boolean = true) : Promise<any> {
    //*
    await User.Seed(log);
    await DefaultObservation.Seed(log);
    await DefaultOperation.Seed(log);
    await MachineType.Seed(log);
    await DefectOrigin.Seed(log);
    await DefectSymptom.Seed(log);
    await Equipment.Seed(log);
    await Sector.Seed(log);
    await InstallationArea.Seed(log);
    
    //*/
    await WorkCenter.Seed(log);
    //*/
    await MeasurementUnit.Seed(log);
    await Item.Seed(log);
    await OrderLayout.Seed(log);
    await SecurityParam.Seed(log);
    await SuperiorEquipment.Seed(log);
    await MaintenanceOrder.Seed(log);
    /**/
  }
}