import { UserRole } from './../models/enum/UserRole';
import { Gender } from './../models/enum/Gender';
import { User as Model } from '../models/User';
import { UserController } from '../controllers/User';
import { Seed } from './Seed';

export class User extends Seed {

  public static async Seed(log: Boolean = true) {
    const user = new User(UserController);
    await user.Executar(log);
  }
  
  public async Mock() {

    const users = User.getUsers()

    for (let i = 0; i < users.length; i++) {
      await this.CadastrarCrud({
        ...users[i],
      });
    }
  }
  
  public static getUsers() {
    return [
      {
        'name': 'Julio',
        'email': 'julio',
        'password': 'julio123',
        'role': UserRole.MAINTAINER,
        'birthDate': '1977-06-03 22:16:46',
        'contact': '4733707700',
        'forceChangePassword': false,
        'employeeBadge': 1234,
        'gender': Gender.MALE,
      },
      {
        'name': 'Lucas',
        'email': 'lucas',
        'password': 'lucas123',
        'role': UserRole.ADMINISTRATOR,
        'birthDate': '1977-06-03 22:16:46',
        'contact': '4733707700',
        'forceChangePassword': false,
        'employeeBadge': 1121,
        'gender': Gender.MALE,
      },
      {
        'name': 'Márcio',
        'email': 'marcio',
        'password': 'marcio123',
        'role': UserRole.SECTOR_LEADER,
        'birthDate': '1977-06-03 22:16:46',
        'contact': '4733707700',
        'forceChangePassword': false,
        'employeeBadge': 3314,
        'gender': Gender.MALE,
      },
      {
        'name': 'José Francisco',
        'email': 'josef',
        'password': 'josef123',
        'role': UserRole.MAINTAINER_LEADER,
        'birthDate': '1977-06-03 22:16:46',
        'contact': '4733707700',
        'forceChangePassword': false,
        'employeeBadge': 9945,
        'gender': Gender.MALE,
      },
      {
        'name': 'agilit',
        'email': 'integration-agilit',
        'password': 'agilit',
        'role': UserRole.INTEGRATION,
        'birthDate': '1977-06-03 22:16:46',
        'contact': '4733707700',
        'forceChangePassword': false,
        'employeeBadge': 'integration-agilit',
        'gender': Gender.OTHER,
      },
      {
        'name': 'Natália',
        'email': 'natalia@senai.com.br',
        'password': 'natalia123',
        'role': UserRole.USER,
        'birthDate': '1977-06-03 22:16:46',
        'contact': '4733707700',
        'forceChangePassword': false,
        'employeeBadge': 8845,
        'gender': Gender.FEMALE,
      },
    ]
  }
}