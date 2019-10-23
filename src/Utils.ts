export class Utils {

  public static getEntitiesPath() : string {
    let dash :string = this.getPlatform() == "Windows" ? "\\" : "/"
    return `${__dirname}${dash}models${dash}**${dash}*.ts`
  }

  public static getPlatform() : string {

    let sistema = process.platform

    if (sistema == "darwin") {
        return "MacOS"
    } else if (sistema == "win32") {
        return "Windows"
    } else if (sistema == "linux") {
        return "Linux";
    }

    throw new Error("Sistema não identificado")
  }
}