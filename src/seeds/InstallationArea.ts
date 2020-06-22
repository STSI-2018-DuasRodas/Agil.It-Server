import { SectorController } from './../controllers/Sector';
import { InstallationArea as Model } from '../models/InstallationArea';
import { InstallationAreaController } from '../controllers/InstallationArea';
import { Seed } from "./Seed";

export class InstallationArea extends Seed {

  public static async Seed(log: Boolean = true) {
    const installationArea = new InstallationArea(InstallationAreaController);
    await installationArea.Executar(log);
  }

  public async Mock() {

    const installations = await InstallationArea.getInstallations()
    
    for (let i = 0; i < installations.length; i++) {
      await this.CadastrarCrud({
        ...(await installations[i]),
      });
    }

  }

  public static async getInstallations() {
    const installations = InstallationArea.getArrayInstallations()

    return installations.map(async installation => {

      return {
        ...installation,
        sector: await InstallationArea.sectorByName(installation.sector)
      }
    });
  }

  public static async sectorByName(description) {
    const sectorController = new SectorController();

    const { id } = await sectorController.getRepositoryEntity().findOneOrFail({
      where: {
        description: description,
      }
    });

    return id;
  }

  public static getArrayInstallations() {
    return [{
      'description':'DR-1000-1000-ALM-ALMOXARIFADO',
      'sector': 'ALMOXARIFADO',
    },
    {
      'description':'DR-1000-1000-ALM-CAMARA',
      'sector': 'CAMARA CENTRAL REFRIGERADA',
    },
    {
      'description':'DR-1000-1000-ALM-FRA',
      'sector': 'FRACIONAMENTO',
    },
    {
      'description':'DR-1000-1000-ALM-TIN',
      'sector': 'TRANSPORTE INTERNO',
    },
    {
      'description':'DR-1000-1000-ARP',
      'sector': 'AROMAS EM PÓ',
    },
    {
      'description':'DR-1000-1000-CEM-COBERTURA',
      'sector': 'COBERTURA',
    },
    {
      'description':'DR-1000-1000-CEM-EMUSTAB',
      'sector': 'EMUSTAB',
    },
    {
      'description':'DR-1000-1000-CEM-RECHEIO',
      'sector': 'RECHEIOS',
    },
    {
      'description':'DR-1000-1000-CEM-VARIEGATOS',
      'sector': 'PASTAS E VARIEGATOS',
    },
    {
      'description':'DR-1000-1000-CON',
      'sector': 'CONDIMENTO',
    },
    {
      'description':'DR-1000-1000-CON-CONDIMENTOS',
      'sector': 'CONDIMENTOS',
    },
    {
      'description':'DR-1000-1000-COR',
      'sector': 'CORANTES/REVENDA',
    },
    {
      'description':'DR-1000-1000-CPA-AFS',
      'sector': 'ANÁLISE FISICO SENSORIAL',
    },
    {
      'description':'DR-1000-1000-CPA-ANP',
      'sector': 'ANÁLISE DE PRODUTOS',
    },
    {
      'description':'DR-1000-1000-CPA-AQM',
      'sector': 'ANÁLISE QUI/MICR/CRO',
    },
    {
      'description':'DR-1000-1000-CPA-MIC',
      'sector': 'ANÁLISE MICROBIOLOGIA',
    },
    {
      'description':'DR-1000-1000-CTA-APL',
      'sector': 'APLICAÇÃO DE PRODUTO',
    },
    {
      'description':'DR-1000-1000-CTA-ATC',
      'sector': 'ATEND. A CLIENTES',
    },
    {
      'description':'DR-1000-1000-CTA-CENTRO',
      'sector': 'CENTRO TEC. E ADM.',
    },
    {
      'description':'DR-1000-1000-CTA-CFM',
      'sector': 'CONSELHO CFM',
    },
    {
      'description':'DR-1000-1000-CTA-DES',
      'sector': 'DESENVOLVIMENTO DE PRODUTOS',
    },
    {
      'description':'DR-1000-1000-CTA-DPP',
      'sector': 'DESEN E PESQUISA DE PRODUTO',
    },
    {
      'description':'DR-1000-1000-CTA-FLA',
      'sector': 'FLAVORISTAS',
    },
    {
      'description':'DR-1000-1000-CTA-GTI-IMP',
      'sector': 'INFRAESTRUTURA DE TI',
    },
    {
      'description':'DR-1000-1000-CTA-HLP',
      'sector': 'AERONAVES',
    },
    {
      'description':'DR-1000-1000-CTA-INO',
      'sector': 'INOVAÇÃO/TECN. JGA -USINA PILOTO',
    },
    {
      'description':'DR-1000-1000-CTA-INOCENTER',
      'sector': 'INOVAÇÃO CENTER',
    },
    {
      'description':'DR-1000-1000-CTA-MKT',
      'sector': 'MARKETING',
    },
    {
      'description':'DR-1000-1000-CTA-PPA',
      'sector': 'PESAGEM E PREPARAÇÃO DE AMOSTRAS',
    },
    {
      'description':'DR-1000-1000-CTA-TDM',
      'sector': 'TRADE MARKETING - AMOSTRAS',
    },
    {
      'description':'DR-1000-1000-CTA-VAR',
      'sector': 'VENDAS AROMAS',
    },
    {
      'description':'DR-1000-1000-CTA-VFR',
      'sector': 'ASSISTENCIA TÉCNICA FRIGORIFICA',
    },
    {
      'description':'DR-1000-1000-DET-DESTILARIA',
      'sector': 'S A DESTILARIA',
    },
    {
      'description':'DR-1000-1000-DET-SCHOTT',
      'sector': 'S A DESTILARIA SCHOTT',
    },
    {
      'description':'DR-1000-1000-DIS',
      'sector': 'DISTRIBUIÇÃO E ARMAZENAGEM',
    },
    {
      'description':'DR-1000-1000-ESS-EMULSOES',
      'sector': 'EMULSÕES E LÍQUIDOS',
    },
    {
      'description':'DR-1000-1000-ESS-ESSENCIA',
      'sector': 'ESSENCIAS',
    },
    {
      'description':'DR-1000-1000-ESS-SAESSENCIA',
      'sector': 'S A ESSÊNCIAS',
    },
    {
      'description':'DR-1000-1000-FLO-BABYFOOD',
      'sector': 'FLOCOS BABY FOOD',
    },
    {
      'description':'DR-1000-1000-FLO-CARNES',
      'sector': 'GORDURA ANIMAL',
    },
    {
      'description':'DR-1000-1000-FLO-DEGELO',
      'sector': 'S.A. DEGELO',
    },
    {
      'description':'DR-1000-1000-FLO-DESIDRATADO',
      'sector': 'DESIDRATADOS',
    },
    {
      'description':'DR-1000-1000-FLO-FLOCOS',
      'sector': 'S A FLOCOS',
    },
    {
      'description':'DR-1000-1000-FLO-MAFOR',
      'sector': 'S A MAFOR',
    },
    {
      'description':'DR-1000-1000-FLO-MALTE',
      'sector': 'S A EXTRATO DE MALTE/SUCOS',
    },
    {
      'description':'DR-1000-1000-INT-ADM',
      'sector': 'ADMINISTRATIVO MANUTENÇÃO',
    },
    {
      'description':'DR-1000-1000-INT-ENERGIA',
      'sector': 'GERAÇÃO DE ENERGIA ELETRICA',
    },
    {
      'description':'DR-1000-1000-MOG',
      'sector': 'CENTRAL DE MOAGEM',
    },
    {
      'description':'DR-1000-1000-NGR-HVP',
      'sector': 'S A HVP LEVEDO',
    },
    {
      'description':'DR-1000-1000-NGR-MOLHOS',
      'sector': 'LINHA DE MOLHOS',
    },
    {
      'description':'DR-1000-1000-RHU-GER',
      'sector': 'GERENCIA REC. HUMANOS',
    },
    {
      'description':'DR-1000-1000-RHU-MDT',
      'sector': 'MEDICINA DO TRABALHO',
    },
    {
      'description':'DR-1000-1000-RHU-REF',
      'sector': 'REFEITÓRIO',
    },
    {
      'description':'DR-1000-1000-RHU-SET',
      'sector': 'SEG. MEDICINA/TRABALHO',
    },
    {
      'description':'DR-1000-1000-RHU-ZEL',
      'sector': 'ZELADORIA',
    },
    {
      'description':'DR-1000-1000-SEG-CALDEIRA',
      'sector': 'CALDEIRAS',
    },
    {
      'description':'DR-1000-1000-SEG-CITRUS',
      'sector': 'FAZENDA S A CITRUS',
    },
    {
      'description':'DR-1000-1000-SEG-ETA',
      'sector': 'ESTAÇÃO DE TRATAMENTO AFLUENTE',
    },
    {
      'description':'DR-1000-1000-SEG-ETE',
      'sector': 'ESTAÇÃO DE TRATAMENTO EFLUENTE',
    },
    {
      'description':'DR-1000-1000-SEG-SEG',
      'sector': 'SERVIÇOS GERAIS',
    },
    {
      'description':'DR-1000-1000-SOR-CASEIRO',
      'sector': 'CASEIRO',
    },
    {
      'description':'DR-1000-1000-SOR-SORVETINA',
      'sector': 'SORVETINA',
    },
    {
      'description':'DR-1000-1000-SPR-SPR34',
      'sector': 'SPRAY 2 E 4',
    },
    {
      'description':'DR-1000-1000-SPR-SPR567',
      'sector': 'SPRAY 5 6 7 8 9',
    },
    {
      'description':'DR-1000-1000-SPR-SPR8',
      'sector': 'SPRAY 8',
    },
    {
      'description':'DR-1000-1000-SPR-SPR9',
      'sector': 'SPRAY 5 6 9',
    }]
  }

}