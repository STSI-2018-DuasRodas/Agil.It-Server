import { InstallationArea as Model } from '../models/InstallationArea';
import { InstallationAreaController } from '../controllers/InstallationArea';
import { Seed } from "./Seed";

export class InstallationArea extends Seed {

  public static Seed(log: Boolean = true) {
    const installationArea = new InstallationArea(InstallationAreaController);
    return installationArea.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "description": "Máquinário de Condimentos",
      "sector": 1,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "description": "Condençadoras",
      "sector": 2,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "description": "TI",
      "sector": 3,
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}