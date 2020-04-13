import { User as Model } from '../models/User';
import { UserController } from '../controllers/User';
import { Seed } from "./Seed";

export class User extends Seed {

  public static Seed(log: Boolean = true) {
    const user = new User(UserController);
    return user.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,  
      "name": "Julio",
      "email": "julio",
      "password": "julio123",
      "role": "maintainer",
      "birthDate": "1977-06-03 22:16:46",
      "contact": "4733707700",
      "forceChangePassword": false,
      "employeeBadge": 1234,
      "gender": "male",
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,  
      "name": "Lucas",
      "email": "lucas",
      "password": "lucas123",
      "role": "administrator",
      "birthDate": "1977-06-03 22:16:46",
      "contact": "4733707700",
      "forceChangePassword": false,
      "employeeBadge": 1121,
      "gender": "male",
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,  
      "name": "Márcio",
      "email": "marcio",
      "password": "marcio123",
      "role": "sector_leader",
      "birthDate": "1977-06-03 22:16:46",
      "contact": "4733707700",
      "forceChangePassword": false,
      "employeeBadge": 3314,
      "gender": "male",
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 4,  
      "name": "José Francisco",
      "email": "josef",
      "password": "josef123",
      "role": "maintainer_leader",
      "birthDate": "1977-06-03 22:16:46",
      "contact": "4733707700",
      "forceChangePassword": false,
      "employeeBadge": 9945,
      "gender": "male",
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    /**/
  }
}