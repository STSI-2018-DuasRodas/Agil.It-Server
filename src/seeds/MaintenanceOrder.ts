import { MaintenanceOrder as Model } from '../models/maintenance-order/MaintenanceOrder';
import { MaintenanceOrderController } from '../controllers/MaintenanceOrder';
import { Seed } from "./Seed";
import { OrderPriority } from '../models/enum/OrderPriority';
import { OrderStatus } from '../models/enum/OrderStatus';

export class MaintenanceOrder extends Seed {

  public static Seed(log: Boolean = true) {
    const maintenanceOrder = new MaintenanceOrder(MaintenanceOrderController);
    return maintenanceOrder.Executar(log);
  }

  public async Mock() {
    //*

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 1,
      "orderNumber": "AGL-0011199",
      "orderType": 1,
      "orderClassification": 1,
      "orderLayout": 1,
      "priority": OrderPriority.HIGH,
      "needStopping": false,
      "isStopped": false,
      "exported": false,
      "openedDate": new Date("2020-01-04"),
      "orderEquipment": {
        "id": 1,
        "maintenanceOrder": 1,
        "equipment": 1,
        "superiorEquipment": 1,
        "installationArea": 1,
        "orderOperation": [
          {
            "orderEquipment": 1,
            "operationNumber": 2,
            "planningTime": 60,
            "executeTime": 0,
            "executed": false,
            "description":"Troca do suporte do motor",
            "note": "",
            "defaultObservation": 1
          },
          {
            "orderEquipment": 1,
            "operationNumber": 1,
            "planningTime": 30,
            "executeTime": 0,
            "executed": false,
            "description":"Concerto no circuito elétrico",
            "note": "",
            "defaultObservation": 2
          },
        ],
        "deleted": false,
        "createdBy": 1,
        "updatedBy": 1
      },
      "defectOrigin": 1,
      "defectOriginNote": "",
      "defectSymptom": 1,
      "defectSymptomNote": "",
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })

    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 2,
      "orderNumber": "AGL-0022221",
      "orderType": 2,
      "orderClassification": 2,
      "orderLayout": 2,
      "priority": OrderPriority.LOW,
      "orderStatus": OrderStatus.STARTED,
      "needStopping": false,
      "isStopped": false,
      "exported": false,
      "openedDate": new Date("2020-01-04"),
      "orderEquipment": [
        {
          "id": 2,
          "maintenanceOrder": 2,
          "equipment": 1,
          "superiorEquipment": 1,
          "installationArea": 1,
          "orderOperation": [
            {
              "orderEquipment": 2,
              "operationNumber": 1,
              "planningTime": 60,
              "executeTime": 0,
              "executed": false,
              "description":"Troca do suporte do motor",
              "note": "",
              "defaultObservation": 1
            },
          ],
          "deleted": false,
          "createdBy": 1,
          "updatedBy": 1
        },
        {
          "id": 3,
          "maintenanceOrder": 2,
          "equipment": 2,
          "superiorEquipment": 2,
          "installationArea": 2,
          "orderOperation": [
            {
              "orderEquipment": 3,
              "operationNumber": 1,
              "planningTime": 120,
              "executeTime": 30,
              "executed": false,
              "description":"Troca da placa integrada do motor.",
              "note": "",
              "defaultObservation": 3
            },
          ],
          "deleted": false,
          "createdBy": 1,
          "updatedBy": 1
        },
      ],
      "maintenanceWorker": [
        {
          "id": 1,
          "user": 1,
          "maintenanceOrder": 2,
          "isMain": true,
          "isActive": true,
          "deleted": false,
          "createdBy": 1,
          "updatedBy": 1,
          "createdAt": "2020-06-04 22:16:46",
          "updatedAt": "2020-06-04 22:16:46"
        }
      ],
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 3,
      "orderNumber": "AGL-003623",
      "orderType": 3,
      "orderClassification": 3,
      "orderLayout": 3,
      "priority": OrderPriority.MEDIUM,
      "orderStatus": OrderStatus.CREATED,
      "needStopping": false,
      "isStopped": false,
      "exported": false,
      "openedDate": new Date("2020-01-04"),
      "orderEquipment":[
        {
          "id": 4,
          "maintenanceOrder": 3,
          "equipment": 3,
          "superiorEquipment": 3,
          "installationArea": 3,
          "orderOperation": [
            {
              "orderEquipment": 4,
              "operationNumber": 1,
              "planningTime": 300,
              "executeTime": 0,
              "executed": false,
              "description":"Concerto do motor elétrico",
              "note": "",
              "defaultObservation": 3
            },
          ],
          "deleted": false,
          "createdBy": 1,
          "updatedBy": 1
        },
      ],
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
    
    await this.controller.getRepositoryEntity().save(<Model><unknown>{
      "id": 4,
      "orderNumber": "AGL-004774",
      "orderType": 1,
      "orderClassification": 3,
      "orderLayout": 2,
      "priority": OrderPriority.URGENT,
      "orderStatus": OrderStatus.CREATED,
      "needStopping": true,
      "isStopped": false,
      "exported": false,
      "openedDate": new Date("2020-01-04"),
      "orderComponent": [
        {
          "id":1,
          "maintenanceOrder": 4,
          "item": 1,
          "quantity": 3,
          "canBeDeleted": false,
          "deleted": false,
          "createdBy": 1,
          "updatedBy": 1,
          "createdAt": "2020-06-04 22:16:46",
          "updatedAt": "2020-06-04 22:16:46"
        }
      ],
      "orderEquipment":[
        {
          "id": 5,
          "maintenanceOrder": 4,
          "equipment": 3,
          "superiorEquipment": 1,
          "installationArea": 1,
          "orderOperation": [
            {
              "orderEquipment": 5,
              "operationNumber": 1,
              "planningTime": 300,
              "executeTime": 0,
              "executed": false,
              "description":"Concerto do motor elétrico",
              "note": "",
              "defaultObservation": 3
            },
          ],
          "deleted": false,
          "createdBy": 1,
          "updatedBy": 1
        },
      ],
      "deleted": false,
      "createdBy": 1,
      "updatedBy": 1,
      "createdAt": "2020-06-04 22:16:46",
      "updatedAt": "2020-06-04 22:16:46"
    })
  }
}