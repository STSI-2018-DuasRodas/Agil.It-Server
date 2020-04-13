import { DefaultObservation as Model } from '../models/DefaultObservation';
import { DefaultObservationController } from '../controllers/DefaultObservation';
import { Seed } from "./Seed";

export class DefaultObservation extends Seed {

  public static Seed(log: Boolean = true) {
    const defaultObservation = new DefaultObservation(DefaultObservationController);
    return defaultObservation.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description":"Parafuso Espanado.",
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description":"Fusível Queimado.",
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description":"Sobrecarga Elétrica.",
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}