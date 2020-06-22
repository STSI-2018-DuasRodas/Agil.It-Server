import { MeasurementUnit as Model } from '../models/MeasurementUnit';
import { MeasurementUnitController } from '../controllers/MeasurementUnit';
import { Seed } from "./Seed";

export class MeasurementUnit extends Seed {

  public static async Seed(log: Boolean = true) {
    const measurementUnit = new MeasurementUnit(MeasurementUnitController);
    await measurementUnit.Executar(log);
  }

  public async Mock() {

    const measurementUnits = MeasurementUnit.getMeasurementUnits()
  
    for (let i = 0; i < measurementUnits.length; i++) {
      await this.CadastrarCrud({
        description: measurementUnits[i],
      });
    }
  }
  
  public static getMeasurementUnits() {
    return [
      'kg',
      'L',
      'M',
      'UN',
    ]
  }
}