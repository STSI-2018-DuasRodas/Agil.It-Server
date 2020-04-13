import { DefectOrigin as Model } from '../models/DefectOrigin';
import { DefectOriginController } from '../controllers/DefectOrigin';
import { Seed } from "./Seed";

export class DefectOrigin extends Seed {

  public static Seed(log: Boolean = true) {
    const defectOrigin = new DefectOrigin(DefectOriginController);
    return defectOrigin.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description":"Refrigerador Desregulado",
      "machineType": 1,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description":"Componente Frouxo",
      "machineType": 2,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description":"Chapa Amassada",
      "machineType": 3,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}