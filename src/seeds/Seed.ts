export class Seed {

  private _controller: any;

  constructor(controller: any) {
    this._controller = new controller()
  }

  public async Executar(log: Boolean = true) {
    const result = await this.CheckSeed()
    if (result) {
      
      if (log) this.logMock()

      await this.Mock();
    }
  }
  
  /**
   * Getter controller
   * @return {any}
   */
	public get controller(): any {
		return this._controller;
	}

  public async Mock() {

  }

  public async CheckSeed() {
    return (await this.controller.getRepositoryEntity().count() < 1);
  }

  public logMock() {
    console.log(`Mocking ${this.getClassName()}'s table`)
  }

  public getClassName() : string {
    let dataClass = this.constructor.toString().match(/\w+/g)
    return dataClass![1];
  }

  public async CadastrarCrud(properties)
  {
    const standardObject = {
      'createdBy': 1,
      'updatedBy': 1,
      ...properties
    }

    const isInserting = true;
    const preSave = await this.controller.preSave(standardObject, isInserting);

    const savedObject = await this.controller.getRepositoryEntity().save(standardObject);

    await this.controller.posSave(savedObject, isInserting, preSave)

    return savedObject;
  }
}