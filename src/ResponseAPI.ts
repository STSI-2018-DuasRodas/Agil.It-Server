export class ResponseAPI {

  public static getResponseObject(success:boolean, value: any = `Registro não encontrado`): any {
    let retorno={
      "success": success
    }
    retorno[success? "data" : "error"]=value
    
    return retorno
  }

}