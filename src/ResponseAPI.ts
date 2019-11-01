export class ResponseAPI {

  public static getResponseObject(success:boolean, value: any = `Registro não encontrado`): any {
    return {
      "success": success,
      "data": value
    }
  }

}