import { SuperiorEquipment as Model } from '../models/SuperiorEquipment';
import { SuperiorEquipmentController } from '../controllers/SuperiorEquipment';
import { Seed } from "./Seed";

export class SuperiorEquipment extends Seed {

  public static Seed(log: Boolean = true) {
    const superiorEquipment = new SuperiorEquipment(SuperiorEquipmentController);
    return superiorEquipment.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description": "Equipamento superior 1",
      "installationArea": 1,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description": "Equipamento superior 2",
      "installationArea": 2,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description": "Equipamento superior 3",
      "installationArea": 3,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}