import { Equipment as Model } from '../models/Equipment';
import { EquipmentController } from '../controllers/Equipment';
import { Seed } from "./Seed";
import { MachineTypeController } from '../controllers/MachineType';

export class Equipment extends Seed {

  public static async Seed(log: Boolean = true) {
    const equipment = new Equipment(EquipmentController);
    await equipment.Executar(log);
  }

  public async Mock() {

    const equipments = await Equipment.getEquipments()
  
    for (let i = 0; i < equipments.length; i++) {
      await this.CadastrarCrud({
        ...(await equipments[i]),
      });
    }

  }
  
  public static async getEquipments() {
    const equipments = Equipment.getArrayEquipments()

    return equipments.map(async equipment => {
      return {
        ...equipment,
        machineType: await Equipment.machineTypeByName(equipment.description.split(' ')[0])
      }
    });
  }

  public static async machineTypeByName(description) {
    const machineTypeController = new MachineTypeController();

    const { id } = await machineTypeController.getRepositoryEntity().findOneOrFail({
      where: {
        description: description,
      }
    });

    return id;
  }
  
  public static getArrayEquipments() {
    return [
      {
        code: "DRJ4684/000",
        description: "SECADOR SPRAY DRYER MOD. DR (PILOTO)",
      },
      {
        code: "DRJ3812/000",
        description: "VENTILADOR MODELO VA 92/300-E",
      },
      {
        code: "DRJ4884/000",
        description: "CONDICIONADOR DE AR SPLIT - 18.000 BTU´S",
      },
      {
        code: "DRJ2846/000",
        description: "CORTINA DE AR",
      },
      {
        code: "DRJ3774/000",
        description: "TRANSFORMADOR WEG 500KVA",
      },
      {
        code: "DRJ3442/005",
        description: "AQUECEDOR PARA ÓLEO - SPRAY-8",
      },
      {
        code: "DRJ5369/000",
        description: "PENEIRA VIBRATÓRIA PRD 750 -SPR8 - SGSA",
      },
      {
        code: "DRJ921/000",
        description: "COZINHADOR - LINHA SIF",
      },
      {
        code: "DRJ3780/000",
        description: "ARMAZEM VERTICAL SHUTTLE SH-40 N°2",
      },
      {
        code: "DRJ5598/000",
        description: "COMPRESSOR DE AR ATLAS COPCO GA90 VSD",
      },
      {
        code: "DRJ378/000",
        description: "REATOR 450.000 L",
      },
      {
        code: "DRJ1835/000",
        description: "CORTINA DE AR",
      },
      {
        code: "DRJ1836/000",
        description: "CORTINA DE AR",
      },
      {
        code: "DRJ1565/000",
        description: "CALDEIRA BIOCHAMM 10TV/H",
      },
      {
        code: "DRJ1565/014",
        description: "VENTILADOR PRIMÁRIO",
      },
      {
        code: "DRJ1565/015",
        description: "EXAUSTOR PRINCIPAL PARA GASES",
      },
      {
        code: "DRJ2094/000",
        description: "SECADOR SPRAY DRYER 5",
      },
      {
        code: "DRJ452/000",
        description: "REATOR A",
      },
      {
        code: "DRJ5020/000",
        description: "BOMBA CENTRIFUGA MEGABLOC - SPR 9",
      },
      {
        code: "DRJ4933/000",
        description: "RESFRIADOR EVAPORATIVO BB150",
      },
      {
        code: "DRJ4934/000",
        description: "RESFRIADOR EVAPORATIVO BB300",
      },
      {
        code: "DRJ4936/000",
        description: "RESFRIADOR EVAPORATIVO BB150",
      },
      {
        code: "DRJ4979/000",
        description: "RESFRIADOR EVAPORATIVO BB300 Nº2",
      },
      {
        code: "DRJ4980/000",
        description: "RESFRIADOR EVAPORATIVO BB300 Nº1",
      },
      {
        code: "DRJ1565/003",
        description: "ROSCA TRANSPORTADORA HORIZONTAL 1A",
      },
      {
        code: "DRJ3534/003",
        description: "VENTILADOR PARA AR DE COMBUSTÃO",
      },
      {
        code: "DRJ4949/000",
        description: "RESFRIADOR EVAPORATIVO BB300 Nº5",
      },
      {
        code: "DRJ4932/000",
        description: "RESFRIADOR EVAPORATIVO BB150",
      },
      {
        code: "DRJ4988/000",
        description: "RESFRIADOR EVAPORATIVO BB150 Nº7",
      },
      {
        code: "DRJ1452/000",
        description: "CÂMARA REFRIGERADA 1",
      },
      {
        code: "DRJ5008/000",
        description: "TERMÔMETRO DIGITAL PORTÁTIL",
      },
      {
        code: "DRJ4548/000",
        description: "ROTULADEIRA BAUSCH & CAMPOS",
      },
      {
        code: "DRJ4959/000",
        description: "TANQUE EMULSOR 2 - SPRAY 9",
      },
      {
        code: "DRJ4125/000",
        description: "TAMPADORA DE FRASCOS - EMG",
      },
      {
        code: "DRJ5350/000",
        description: "BALANÇA ELETRÔNICA BI5040",
      },
      {
        code: "DRJ1229/000",
        description: "REATOR PARA FUSÃO DE GORDURAS 1",
      },
      {
        code: "DRJ4730/000",
        description: "EMPACOTADORA SELGRON MOD. TG1000",
      },
      {
        code: "DRJ2101/000",
        description: "REATOR N",
      },
      {
        code: "DRJ2021/000",
        description: "EMPACOTADORA BOSCH SVB 2502 A",
      },
      {
        code: "DRJ3442/000",
        description: "SECADOR SPRAY DRYER 8",
      },
      {
        code: "DRJ3935/000",
        description: "DECANTER CENTRÍFUGO MOD. D2L C30 BHP",
      },
      {
        code: "DRJ1454/004",
        description: "UNIDADE CONDENSADORA Nº6",
      },
      {
        code: "DRJ4724/000",
        description: "GERADOR DE ENERGIA MOD. GEP110-4 - DIS",
      },
      {
        code: "DRJ2261/000",
        description: "TANQUE DO LAVADOR PARA GASES",
      },
      {
        code: "DRJ4956/001",
        description: "ROTOR ATOMIZADOR SPR 9",
      },
      {
        code: "DRJ5365/000",
        description: "REATOR W",
      },
      {
        code: "DRJ3898/000",
        description: "BOMBA CENTRÍFUGA IMBIL - CREPINAS",
      },
      {
        code: "DRJ1702/000",
        description: "BOMBA CENTRÍFUGA 8",
      },
      {
        code: "DRJ4725/000",
        description: "GERADOR DE ENERGIA MOD. GEP65-11 - CTA",
      },
      {
        code: "DRJ4434/001",
        description: "EVAPORADORA - FRA",
      },
      {
        code: "DRJ1703/000",
        description: "BOMBA CENTRÍFUGA 7",
      },
      {
        code: "DRJ498/000",
        description: "REATOR 1 - SGSA",
      },
      {
        code: "DRJ2805/000",
        description: "REATOR EM INOX 4",
      },
      {
        code: "DRJ1913/000",
        description: "CONIMIX 3 | MISTURADOR MOD.FA-27",
      },
      {
        code: "DRJ2094/001",
        description: "AQUECEDOR A VAPOR - SPRAY 5",
      },
      {
        code: "DRJ5421/001",
        description: "BOMBA DE ALIMENTAÇÃO - MOINHO LM50",
      },
      {
        code: "DRJ5412/002",
        description: "DERRETEDOR DE GORDURA Nº1",
      },
      {
        code: "DRJ3726/000",
        description: "SISTEMA DE COSTURA WAIG MOD. WM-S -SPR8",
      },
      {
        code: "DRJ1612/001",
        description: "CAIXA DE RECICLO (BIOFILTRO) Nº 63",
      },
      {
        code: "DRJ5164/000",
        description: "DETECTOR DE GASES",
      },
      {
        code: "DRJ3350/001",
        description: "CLASSIFICADOR ROTATIVO (CONIMIX 4) SGSA",
      },
      {
        code: "DRJ4843/000",
        description: "SELADORA ROTATIVA Nº2",
      },
      {
        code: "DRJ3664/000",
        description: "BEBEDOURO",
      },
      {
        code: "DRJ1823/000",
        description: "EXTRATOR P/ AROMA DE FUMAÇA 2",
      },
      {
        code: "DRJ676/000",
        description: "MOINHO PARA FLOCOS Nº 2",
      },
      {
        code: "DRJ1460/000",
        description: "BANHO MARIA",
      },
      {
        code: "DRJ3350/000",
        description: "CONIMIX 4 | MISTURADOR MOD. FA-131",
      },
      {
        code: "DRJ5343/000",
        description: "SISTEMA TRANSPORTE PNEUMÁTICO DO SAL",
      },
      {
        code: "DRJ5508/000",
        description: "SELADORA SPG PNEUMÁTICA - 700",
      },
      {
        code: "DRJ1565/004",
        description: "ROSCA TRANSPORTADORA HORIZONTAL 1B",
      },
      {
        code: "DRJ408/008",
        description: "EXAUSTOR PRINCIPAL - SPRAY 4",
      },
      {
        code: "DRJ1344/000",
        description: "SECADOR A VACUO MAFOR - 8",
      },
      {
        code: "DRJ408/003",
        description: "BOMBA PARA MATERIAL AO ATOMIZADOR",
      },
      {
        code: "DRJ406/003",
        description: "BOMBA PARA MATERIAL AO ATOMIZADOR",
      },
      {
        code: "DRJ5003/000",
        description: "REFRIGERADOR CHILLER",
      },
      {
        code: "DRJ813/000",
        description: "MOINHO PARA ACUCAR - MOAGEM",
      },
      {
        code: "DRJ5723/000",
        description: "BEBEDOURO INDUSTRIAL 25LTS INOX",
      },
      {
        code: "DRJ4968/000",
        description: "VÁLVULA ROTATIVA -1 SPRAY 9",
      },
      {
        code: "DRJ850/000",
        description: "DOSADORA MASIPACK",
      },
      {
        code: "DRJ3891/000",
        description: "VENTILADOR CENTRIFUGO VBR-231 -SPR8",
      },
      {
        code: "DRJ5216/000",
        description: "ANALISADOR DE PONTO FULGOR",
      },
      {
        code: "DRJ1813/000",
        description: "MISTURADOR RIBBON BLENER DE AÇO INOX",
      },
      {
        code: "DRJ4511/001",
        description: "ROSCA TRANSPORTADORA N° 1 - MOAGEM",
      },
      {
        code: "DRJ1474/009",
        description: "ROTOR ATOMIZADOR - SPRAY 7",
      },
      {
        code: "DRJ5065/000",
        description: "TORRE RESFRIAMENTO PARA ÁGUA - ALPINA",
      },
      {
        code: "DRJ4354/000",
        description: "EMPACOTADORA BOSCH SVB 2510L",
      },
      {
        code: "DRJ5505/000",
        description: "SISTEMA DE DOSAGEM",
      },
      {
        code: "DRJ4436/000",
        description: "DESUMIDIFICADOR UTA GB 2400 PLUS",
      },
      {
        code: "DRJ2447/000",
        description: "MOINHO PARA FLOCOS Nº 4",
      },
      {
        code: "DRJ2310/000",
        description: "BALANÇA 0,01-3700G",
      },
      {
        code: "DRJ2567/001",
        description: "TAMPADORA ROTATIVA MODELO R4/400",
      },
      {
        code: "DRJ16354/004",
        description: "PAINEL ELÉTRICO DO SECADOR SPRAY N 4",
      },
      {
        code: "DRJ729/000",
        description: "ELEVADORES ENTORNADOR DE TAMBORES",
      },
      {
        code: "DRJ2546/000",
        description: "RESERVATORIO ELEVADO EM CONCRETO",
      },
      {
        code: "DRJ4969/000",
        description: "VÁLVULA ROTATIVA -02 SPRAY 9",
      },
      {
        code: "DRJ310/000",
        description: "MISTURADOR HORIZONTAL (PILLAT 1)",
      },
      {
        code: "DRJ406/000",
        description: "SECADOR SPRAY DRYER 2",
      },
      {
        code: "DRJ408/000",
        description: "SECADOR SPRAY DRYER 4",
      },
      {
        code: "DRJ2301/000",
        description: "CONIMIX 1 | MISTURADOR ORBITAL",
      },
      {
        code: "DRJ4722/000",
        description: "REATOR PARA EMUSTAB TIPO ANCORA N° 05",
      },
      {
        code: "DRJ5434/000",
        description: "TANQUE 3000L P/ AGUA QUENTE 45ºC",
      },
      {
        code: "DRJ4124/000",
        description: "TAMPADORA DE FRASCOS - EMG",
      },
      {
        code: "DRJ2874/000",
        description: "BALANÇA ALFA (CAPAC. 18 KG)",
      },
      {
        code: "DRJ677/000",
        description: "CLASSIFICADOR ROTATIVO",
      },
      {
        code: "DRJ1584/000",
        description: "COLETOR DE PÓ MIB-02 Nº 1",
      },
      {
        code: "DRJ4731/000",
        description: "ENFARDADEIRA FUTURASTOCK SELGRON",
      },
      {
        code: "DRJ3501/000",
        description: "REATOR 11 CAP 4000L",
      },
      {
        code: "DRJ369/000",
        description: "PH METRO DIGIMED PH- 41",
      },
      {
        code: "DRJ5405/000",
        description: "ENVOLVEDORA DE FILME STRETCH GK 2100",
      },
      {
        code: "DRJ1807/000",
        description: "COMPRESSOR DE AR SCHULZ SRP 2050",
      },
      {
        code: "DRJ1730/000",
        description: "BALANÇA CAP. 3KG",
      },
      {
        code: "DRJ4252/000",
        description: "DESPOLPADEIRA",
      },
      {
        code: "DRJ4713/000",
        description: "SELADORA SPG PNEUMÁTICA",
      },
      {
        code: "DRJ4712/000",
        description: "SELADORA SPG PNEUMÁTICA",
      },
      {
        code: "DRJ4549/000",
        description: "ROTULADEIRA BAUSCH & CAMPOS - EMG",
      },
      {
        code: "DRJ1803/000",
        description: "DESUMIDIFICADOR MUNTERS",
      },
      {
        code: "DRJ2646/000",
        description: "EMULSOR N° 3",
      },
      {
        code: "DRJ4683/000",
        description: "MAQUINA PARA COSTURA WPC",
      },
      {
        code: "DRJ3932/000",
        description: "BOMBA DOSADORA DE SODA DLX",
      },
      {
        code: "DRJ2431/000",
        description: "CAÇAMBA PARA EFLEUENTES CONCENTRADOR",
      },
      {
        code: "DRJ503/000",
        description: "SECADOR DE SUPERFICIE RASPADA DRUM 3",
      },
      {
        code: "DRJ5374/000",
        description: "ENVOLVEDORA DE FILME STRETCH GK 2100",
      },
      {
        code: "DRJ5053/000",
        description: "EMULSOR TRIBLENDER",
      },
      {
        code: "DRJ2710/000",
        description: "ROTULADEIRA BAUSCH & CAMPOS",
      },
      {
        code: "DRJ2883/000",
        description: "MISTURADOR RIBBON BLENDER PILLAT 4-BOSCH",
      },
      {
        code: "DRJ2062/000",
        description: "MOINHO VERTICAL KE 50(S)",
      },
      {
        code: "DRJ5423/000",
        description: "MOINHO MASTERREFINER 300",
      },
      {
        code: "DRJ2946/000",
        description: "EMPILHADEIRA A GÁS HISTER H50FT/GLP 8",
      },
      {
        code: "DRJ503/003",
        description: "QUEBRADOR PARA FILME (FLOCOS)",
      },
      {
        code: "DRJ5167/000",
        description: "LAVADORA DE PISO INDUSTRIAL",
      },
      {
        code: "DRJ2094/004",
        description: "VÁLVULA ROTATIVA -2 SPRAY 5",
      },
      {
        code: "DRJ2094/009",
        description: "ROTOR ATOMIZADOR - SPRAY 5",
      },
      {
        code: "DRJ5170/000",
        description: "ENVAZADORA MAQINOX",
      },
      {
        code: "DRJ705/000",
        description: "EMULSOR (GRANDE)",
      },
      {
        code: "DRJ2787/000",
        description: "BALANÇA (CAPAC. 3 KG)",
      },
      {
        code: "DRJ1901/000",
        description: "ANALISADOR DE ATIVIDADE DE AGUA",
      },
      {
        code: "DRJ2087/000",
        description: "BOMBA P/ VACUO DO CONCENTRADOR DINKELS",
      },
      {
        code: "DRJ470/000",
        description: "DESTILADOR LUWA",
      },
      {
        code: "DRJ1990/000",
        description: "CLASSIFICADOR ROTATIVO (CONIMIX 3) SGSA",
      },
      {
        code: "DRJ4333/000",
        description: "REATOR 3 EMUSTAB",
      },
      {
        code: "DRJ206/000",
        description: "REATOR X - SGSA",
      },
      {
        code: "DRJ5504/000",
        description: "SISTEMA DE DOSAGEM",
      },
      {
        code: "DRJ2102/000",
        description: "REATOR PARA BACON Nº01",
      },
      {
        code: "DRJ704/000",
        description: "ENVASADORA ENVAZA P/ EMULTINA",
      },
      {
        code: "DRJ862/000",
        description: "CLASSIFICADOR ROTATIVO 03 SGSA SELGRON",
      },
      {
        code: "DRJ5396/000",
        description: "EMPILHADEIRA A GÁS - TOYOTA 13",
      },
      {
        code: "DRJ746/000",
        description: "EMPILHADEIRA A GAS - HYSTER 5",
      },
      {
        code: "DRJ5400/000",
        description: "EMPILHADEIRA ELÉTRICA EGV14",
      },
      {
        code: "DRJ2006/000",
        description: "BALANÇA 50 - 250.000G",
      },
      {
        code: "DRJ3477/000",
        description: "MISTURADOR HORIZONTAL MH 200I CONSOLID",
      },
      {
        code: "DRJ4533/000",
        description: "BALANÇA ELETRÔNICA ALFA 300KG",
      },
      {
        code: "DRJ4027/000",
        description: "REATOR PARA RECHEIO 12",
      },
      {
        code: "DRJ3765/000",
        description: "CONDICIONADOR DE AR SPLIT 9000BTUS",
      },
      {
        code: "DRJ1476/001",
        description: "BOMBA P/ ALIMENTAÇÃO - SPRAY7",
      },
      {
        code: "DRJ5669/000",
        description: "SELADORA ROTATIVA AUTOMÁTICA WS-AR Nº3",
      },
      {
        code: "DRJ4956/000",
        description: "SECADOR SPRAY DRYER 9",
      },
      {
        code: "DRJ5433/000",
        description: "TANQUE 2000L P/ AGUA QUENTE 60ºC",
      },
      {
        code: "DRJ5444/000",
        description: "ENVOLVEDORA DE FILME STRETCH GK 2100",
      },
      {
        code: "DRJ2204/000",
        description: "BALANÇA 50-300.000G",
      },
      {
        code: "DRJ505/000",
        description: "MOINHO COMITROL",
      },
      {
        code: "DRJ5504/001",
        description: "ROTULADEIRA DO SISTEMA DOSAGEM- LINHA 2",
      },
      {
        code: "DRJ2567/000",
        description: "ENVASILHADORA/DOSADORA ROTAT. PACKER",
      },
      {
        code: "DRJ316/000",
        description: "CLASSIFICADOR ROTATIVO (CONIMIX 2) SGSA",
      },
      {
        code: "DRJ3433/000",
        description: "BALANÇA ALFA 300KG",
      },
      {
        code: "DRJ2675/000",
        description: "REATOR FUSÃO DE GORDURAS (SPRAY 6) N° 17",
      },
      {
        code: "DRJ4451/000",
        description: "MEDIDOR DE PH METTLER TOLEDO FE20",
      },
      {
        code: "DRJ471/000",
        description: "DESTILADOR SCHOTT N1",
      },
      {
        code: "DRJ4773/000",
        description: "SISTEMA DE COSTURA WAIG",
      },
      {
        code: "DRJ1856/000",
        description: "CLASSIFICADOR ROTATIVO",
      },
      {
        code: "DRJ5151/000",
        description: "HOMOGENEIZADOR APL-2000",
      },
      {
        code: "DRJ627/000",
        description: "REATOR Z 2",
      },
      {
        code: "DRJ4452/000",
        description: "SOPRADOR ROTATIVO (MOINHO AÇÚCAR)",
      },
      {
        code: "DRJ1820/001",
        description: "UNIDADE PARA REFRIGERAÇÃO RLA-120",
      },
      {
        code: "DRJ5183/000",
        description: "BEBEDOURO GARRAFÃO",
      },
      {
        code: "DRJ3442/016",
        description: "AQUECEDOR P/ VAPOR LEITO FLUIDIZADO-SPR8",
      },
      {
        code: "DRJ4420/000",
        description: "FILTRO PRENSA TECITEC",
      },
      {
        code: "DRJ827/000",
        description: "DOSADORA RAUMACK 5 E 15 KG",
      },
      {
        code: "DRJ2660/000",
        description: "EMPILHADEIRA ELETRICA EP 1600",
      },
      {
        code: "DRJ1723/000",
        description: "PELETRAN BALANÇA",
      },
      {
        code: "DRJ4534/000",
        description: "BALANÇA ELETRÔNICA ALFA 50KG",
      },
      {
        code: "DRJ4401/000",
        description: "BALANÇA ELETRÔNICA ALFA 300KG",
      },
      {
        code: "DRJ4697/000",
        description: "ASPIRADOR DE PÓ PROFISSIONAL IPC A262",
      },
      {
        code: "DRJ4873/000",
        description: "ENVOLVEDORA DE FILME STRETCH GK 2100",
      },
      {
        code: "DRJ2628/002",
        description: "ALIMENTADOR MOVEL 3",
      },
      {
        code: "DRJ3534/004",
        description: "BOMBA CENTRÍFUGA PARA ÓLEO",
      },
      {
        code: "DRJ2527/000",
        description: "REATOR 8 (RECHEIO)",
      },
      {
        code: "DRJ1043/000",
        description: "CONDICIONADOR DE AR CAP. 10.000 BTU'S",
      },
      {
        code: "DRJ1820/000",
        description: "TROCADOR DE CALOR DE SUPERFICIE RASPADA",
      },
      {
        code: "DRJ1236/000",
        description: "EMPILHADEIRA ELÉTRICA CAP. 1600KG",
      },
      {
        code: "DRJ2676/000",
        description: "REATOR EMULSOR DISPERSOR (SPRAY 6) N° 15",
      },
      {
        code: "DRJ3434/000",
        description: "SISTEMA PARA PESAGEM DO REATOR 9",
      },
      {
        code: "DRJ2381/000",
        description: "EMPILHADEIRA EP CAPACIDADE 1500KG",
      },
      {
        code: "DRJ1474/000",
        description: "SECADOR SPRAY DRYER 7",
      },
      {
        code: "DRJ1474/001",
        description: "AQUECEDOR A VAPOR - SPRAY 7",
      },
      {
        code: "DRJ4241/000",
        description: "CARRINHO PARA CAÇAMBA DE RESÍDUOS",
      },
      {
        code: "DRJ5062/000",
        description: "MONOBOMBA NETZSCH/NEMO",
      },
      {
        code: "DRJ2397/000",
        description: "BOMBA CENTRIFUGA - CONICO 3",
      },
      {
        code: "DRJ3680/000",
        description: "CARRO HIDRÁULICO",
      },
      {
        code: "DRJ1344/002",
        description: "COLUNA PARA VACUO MAFOR 8",
      },
      {
        code: "DRJ4564/000",
        description: "ROTULADEIRA AUTOMÁTICA RL 3000 MAQMUNDI",
      },
      {
        code: "DRJ5515/000",
        description: "TRANSPALETEIRA PANTOGRAFICA",
      },
      {
        code: "DRJ4507/000",
        description: "EMPILHADEIRA ELÉTRICA STILL EGV - 1400KG",
      },
      {
        code: "DRJ607/000",
        description: "REATOR DE MALTE 8 - SGSA",
      },
      {
        code: "DRJ5220/000",
        description: "CHAPA AQUECEDORA MOD. TE-038/2-MP",
      },
      {
        code: "DRJ5406/000",
        description: "BANHO MARIA 5L",
      },
      {
        code: "DRJ4841/000",
        description: "ENFARDADEIRA FUTURASTOCK SELGRON",
      },
      {
        code: "DRJ5281/000",
        description: "DETECTOR DE METAL ESTEIRA -SPR8",
      },
      {
        code: "DRJ4721/000",
        description: "REATOR PARA RECHEIO TIPO ANCORA N° 04",
      },
      {
        code: "DRJ5582/001",
        description: "SISTEMA DE PESAGEM 3104C",
      },
      {
        code: "DRJ5269/000",
        description: "LAVADORA DE PISO INDUSTRIAL CT70",
      },
      {
        code: "DRJ4077/000",
        description: "MAQUINA PARA COSTURA MOD. WPC",
      },
      {
        code: "DRJ2674/004",
        description: "MOINHO AÇO INOXIDÁVEL Nº 5",
      },
      {
        code: "DRJ406/008",
        description: "EXAUSTOR PRINCIPAL - SPRAY 2",
      },
      {
        code: "DRJ408/012",
        description: "AQUECEDOR/RADIADOR OLEO TERMICO -SPR 4",
      },
      {
        code: "DRJ437/000",
        description: "ELEVADOR CAPACIDADE 2000 KG",
      },
      {
        code: "DRJ16360/007",
        description: "PAINEL ELÉTRICO - SPRAY 7",
      },
      {
        code: "DRJ4531/000",
        description: "MAQUINA PARA COSTURA WPC12",
      },
      {
        code: "DRJ4530/000",
        description: "MAQUINA PARA COSTURA WPC12",
      },
      {
        code: "DRJ2599/000",
        description: "SECADOR LEITO FLUIDIZADO TREU GLATT",
      },
      {
        code: "DRJ2676/001",
        description: "BOMBA P/ CIRCULAÇÃO (SPRAY 6)",
      },
      {
        code: "DRJ2698/000",
        description: "MOINHO EM ACO INOX Nº 7",
      },
      {
        code: "DRJ3911/000",
        description: "BALANÇA PRECISÃO",
      },
      {
        code: "DRJ490/000",
        description: "REATOR F",
      },
      {
        code: "DRJ2686/000",
        description: "SECADOR A VACUO MAFOR - 4",
      },
      {
        code: "DRJ5399/000",
        description: "EMPILHADEIRA ELÉTRICA EGV-16",
      },
      {
        code: "DRJ102011/004",
        description: "BATERIA DE FILTRO MICROFILTRAGEM",
      },
      {
        code: "DRJ680/000",
        description: "SALA DESUMIDIFICADA 3",
      },
      {
        code: "DRJ4121/000",
        description: "EMPILHADEIRA ELÉTRICA - 1600KG",
      },
      {
        code: "DRJ2703/000",
        description: "SECADOR SPRAY DRYER 6",
      },
      {
        code: "DRJ4599/000",
        description: "EMPILHADEIRA ELÉTRICA RETRÁTIL MOD.FMX17",
      },
      {
        code: "DRJ1822/000",
        description: "CONCENTRADOR P/ EXTRATOS VEGETAIS",
      },
      {
        code: "DRJ2231/000",
        description: "UNIDADE P/ REFRIGERACAO DE LIQUIDO",
      },
      {
        code: "DRJ5415/003",
        description: "MISTURADOR TRIBLENDER Nº2",
      },
      {
        code: "DRJ3490/000",
        description: "BALANÇA PALETRAN",
      },
      {
        code: "DRJ5672/000",
        description: "BOMBA NETZSCH/NEMO",
      },
      {
        code: "DRJ959/000",
        description: "ROSADEIRA SUPER TATU 3",
      },
      {
        code: "DRJ681/000",
        description: "SALA DESUMIFICADA 2",
      },
      {
        code: "DRJ4960/000",
        description: "TANQUE DO LAVADOR PARA GASES - SPRAY 9",
      },
      {
        code: "DRJ927/001",
        description: "BOMBA DE VACUO - BORAG",
      },
      {
        code: "DRJ5343/020",
        description: "VALVULA DIRECIONADORA - LINHA 02",
      },
      {
        code: "DRJ3534/013",
        description: "ESTEIRA TRANSPORTADORA",
      },
      {
        code: "DRJ1565/026",
        description: "ESTEIRA TRANSPORTADORA",
      },
      {
        code: "DRJ5677/000",
        description: "DETECTOR DE METAL HORIZONTAL SGSA",
      },
      {
        code: "DRJ5503/000",
        description: "SISTEMA DE DOSAGEM",
      },
      {
        code: "DRJ702/000",
        description: "ROTULADEIRA JPJ MODELO JP-6",
      },
      {
        code: "DRJ1343/001",
        description: "BOMBA CENTRIFUGA",
      },
      {
        code: "DRJ4644/000",
        description: "BALANÇA ELETRÔNICA DE BANCADA 50KG",
      },
      {
        code: "DRJ2956/000",
        description: "TERMÔMETRO DIGITAL LCD",
      },
      {
        code: "DRJ3429/000",
        description: "CAÇAMBA HIDRÁULICA",
      },
      {
        code: "DRJ16355/004",
        description: "RESERVATORIO CAPACIDADE 1000L",
      },
      {
        code: "DRJ5343/002",
        description: "ROSCA DOSADORA INCLINADA (AZUL)",
      },
      {
        code: "DRJ4191/000",
        description: "CARRO HIDRÁULICO MODELO TM 2220 SN",
      },
      {
        code: "DRJ301/000",
        description: "MOINHO COM MARTELOS PARA ERVAS",
      },
      {
        code: "DRJ1826/000",
        description: "PÁ CARREGADEIRA",
      },
      {
        code: "DRJ3080/000",
        description: "ELEVADOR CAPACIDADE 3.500 KG",
      },
      {
        code: "DRJ4292/000",
        description: "SISTEMA PESAGEM CW3 CHECKWEIGHER- PACKER",
      },
      {
        code: "DRJ3715/000",
        description: "EMPILHADEIRA ELÉTRICA BT CAP. 2.500KG",
      },
      {
        code: "DRJ2795/000",
        description: "BALANÇA (CAPAC. 60 KG)",
      },
      {
        code: "DRJ4291/000",
        description: "SISTEMA PARA PESAGEM CW3 CHECKWEIGHER",
      },
      {
        code: "DRJ4356/000",
        description: "BOMBA PARA LAVAÇÃO SPR 5, 6 E 7",
      },
      {
        code: "DRJ5349/000",
        description: "BALANÇA ELETRÔNICA BI5040",
      },
      {
        code: "DRJ464/000",
        description: "REATOR S",
      },
      {
        code: "DRJ2820/000",
        description: "BOMBA CENTRÍFUGA HORIZONTAL IMBIL 15",
      },
      {
        code: "DRJ5410/000",
        description: "MÁQUINA DE COSTURA MOD.II",
      },
      {
        code: "DRJ5275/000",
        description: "EMPILHADEIRA ELÉTRICA MOD. RX50-16 Nº12",
      },
      {
        code: "DRJ2098/000",
        description: "SECADOR SPRAY DRYER PILOTO DA APV",
      },
      {
        code: "DRJ1742/000",
        description: "EMPILHADEIRA ELETRICA SKAM 1600",
      },
      {
        code: "DRJ4001/000",
        description: "CARRO HIDRÁULICO",
      },
      {
        code: "DRJ5347/000",
        description: "CARRO HIDRAULICO TK20 685 NBN",
      },
      {
        code: "DRJ3619/000",
        description: "REATOR B",
      },
      {
        code: "DRJ202/000",
        description: "REATOR 1 (COBERTURA)",
      },
      {
        code: "DRJ3025/000",
        description: "CONIMIX 2 | MISTURADOR FB-76 ORBITAL",
      },
      {
        code: "DRJ2703/001",
        description: "AQUECEDOR A VAPOR",
      },
      {
        code: "DRJ4592/000",
        description: "BALANÇA CAPACIDADE 300KG",
      },
      {
        code: "DRJ3714/000",
        description: "ELEVADOR CAPACIDADE 2000KG - SPR8",
      },
      {
        code: "DRJ3004/000",
        description: "CONDICIONADOR DE AR CAP. 10.000 BTU'S",
      },
      {
        code: "DRJ675/000",
        description: "MOINHO MARTELO Nº 3",
      },
      {
        code: "DRJ4294/000",
        description: "DETECTOR DE METAIS PHANTOM DIGITAL SGSA",
      },
      {
        code: "DRJ2703/011",
        description: "TANQUE DO LAVADOR PARA GASES SPR 6",
      },
      {
        code: "DRJ4820/000",
        description: "ENVASADORA VERTICAL SPK 250 - MAQINOX",
      },
      {
        code: "DRJ4844/001",
        description: "ESTEIRA DE SAÍDA DA ENFARD. SELGRON",
      },
      {
        code: "DRJ3476/000",
        description: "MOINHO TIGRE ASN 50/17",
      },
      {
        code: "DRJ5421/000",
        description: "MOINHO AGITADOR LME50",
      }
    ]
  }
}