import { DefaultOperationController } from '../controllers/DefaultOperation';
import { Seed } from "./Seed";

export class DefaultOperation extends Seed {

  public static async Seed(log: Boolean = true) {
    const defaultOperation = new DefaultOperation(DefaultOperationController);
    await defaultOperation.Executar(log);
  }

  public async Mock() {

    const operations = DefaultOperation.getDefaultOperations()
  
    for (let i = 0; i < operations.length; i++) {
      await this.CadastrarCrud({
        description: operations[i],
      });
    }
  }
  
  public static getDefaultOperations() {
    return [
      'Troca de Parafuso',
      'Limpeza dos Componentes',
      'Troca de Componente',
    ]
  }
}