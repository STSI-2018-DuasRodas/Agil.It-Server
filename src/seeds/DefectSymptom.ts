import { DefectSymptom as Model } from '../models/DefectSymptom';
import { DefectSymptomController } from '../controllers/DefectSymptom';
import { Seed } from "./Seed";

export class DefectSymptom extends Seed {

  public static Seed(log: Boolean = true) {
    const defectSymptom = new DefectSymptom(DefectSymptomController);
    return defectSymptom.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description":"Sobreaquecimento",
      "machineType": 1,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description":"Componente Quebrado",
      "machineType": 2,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description":"Desalinhamento das lâminas",
      "machineType": 3,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}