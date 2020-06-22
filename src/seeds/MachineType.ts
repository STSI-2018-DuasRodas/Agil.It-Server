import { MachineType as Model } from '../models/MachineType';
import { MachineTypeController } from '../controllers/MachineType';
import { Seed } from './Seed';

export class MachineType extends Seed {

  public static async Seed(log: Boolean = true) {
    const machineType = new MachineType(MachineTypeController);
    await machineType.Executar(log);
  }

  public async Mock() {

    const machineTypes = MachineType.getMachineTypes()
  
    for (let i = 0; i < machineTypes.length; i++) {
      await this.CadastrarCrud({
        description: machineTypes[i],
      });
    }
  }
  
  public static getMachineTypes() {
    return [
      'SECADOR',
      'VENTILADOR',
      'CONDICIONADOR',
      'CORTINA',
      'TRANSFORMADOR',
      'AQUECEDOR',
      'PENEIRA',
      'COZINHADOR',
      'ARMAZEM',
      'COMPRESSOR',
      'REATOR',
      'CALDEIRA',
      'EXAUSTOR',
      'BOMBA',
      'RESFRIADOR',
      'ROSCA',
      'CÂMARA',
      'TERMÔMETRO',
      'ROTULADEIRA',
      'TANQUE',
      'TAMPADORA',
      'BALANÇA',
      'EMPACOTADORA',
      'DECANTER',
      'UNIDADE',
      'GERADOR',
      'ROTOR',
      'EVAPORADORA',
      'CONIMIX',
      'DERRETEDOR',
      'SISTEMA',
      'CAIXA',
      'DETECTOR',
      'CLASSIFICADOR',
      'SELADORA',
      'BEBEDOURO',
      'EXTRATOR',
      'MOINHO',
      'BANHO',
      'REFRIGERADOR',
      'VÁLVULA',
      'DOSADORA',
      'ANALISADOR',
      'MISTURADOR',
      'TORRE',
      'DESUMIDIFICADOR',
      'PAINEL',
      'ELEVADORES',
      'RESERVATORIO',
      'COLETOR',
      'ENFARDADEIRA',
      'PH',
      'ENVOLVEDORA',
      'DESPOLPADEIRA',
      'EMULSOR',
      'MAQUINA',
      'CAÇAMBA',
      'EMPILHADEIRA',
      'QUEBRADOR',
      'LAVADORA',
      'ENVAZADORA',
      'DESTILADOR',
      'ENVASADORA',
      'ENVASILHADORA/DOSADORA',
      'MEDIDOR',
      'HOMOGENEIZADOR',
      'SOPRADOR',
      'FILTRO',
      'PELETRAN',
      'ASPIRADOR',
      'ALIMENTADOR',
      'TROCADOR',
      'CARRINHO',
      'MONOBOMBA',
      'CARRO',
      'COLUNA',
      'TRANSPALETEIRA',
      'CHAPA',
      'AQUECEDOR/RADIADOR',
      'ELEVADOR',
      'BATERIA',
      'SALA',
      'CONCENTRADOR',
      'ROSADEIRA',
      'VALVULA',
      'ESTEIRA',
      'PÁ',
      'MÁQUINA'
    ]
  }
}