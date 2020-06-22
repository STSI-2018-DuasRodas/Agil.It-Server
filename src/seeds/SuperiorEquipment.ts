import { SuperiorEquipment as Model } from '../models/SuperiorEquipment';
import { SuperiorEquipmentController } from '../controllers/SuperiorEquipment';
import { Seed } from "./Seed";

export class SuperiorEquipment extends Seed {

  public static async Seed(log: Boolean = true) {
    const superiorEquipment = new SuperiorEquipment(SuperiorEquipmentController);
    await superiorEquipment.Executar(log);
  }

  public async Mock() {

    const superiorEquipments = SuperiorEquipment.getSuperiorEquipments()

    for (let i = 0; i < superiorEquipments.length; i++) {
      await this.CadastrarCrud({
        ...superiorEquipments[i],
      });
    }
  }
  
  public static getSuperiorEquipments() {
    return [
      {
        "description": "Equipamento superior 1",
      },
      {
        "description": "Equipamento superior 2",
      },
      {
        "description": "Equipamento superior 3",
      },
    ]
  }
}