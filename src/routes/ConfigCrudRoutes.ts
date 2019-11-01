export class ConfigCrudRoutes {

	private addGetAll	: boolean;
	private addGetById: boolean;
	private addPost		: boolean;
	private addUpdate	: boolean;
	private addDelete	: boolean;

	constructor(addGetAll : boolean = true, addGetById : boolean = true, addPost : boolean = true, addUpdate : boolean = true, addDelete : boolean = true){
		this.addGetAll  = addGetAll;
		this.addGetById = addGetById;
		this.addPost 	  = addPost;
		this.addUpdate  = addUpdate;
		this.addDelete  = addDelete;
	}

	public getAddGetAll(): boolean {
		return this.addGetAll;
	}

	public getAddGetById(): boolean {
		return this.addGetById;
	}

	public getAddPost(): boolean {
		return this.addPost;
	}

	public getAddUpdate(): boolean {
		return this.addUpdate;
	}

	public getAddDelete(): boolean {
		return this.addDelete;
	}

	public setAddGetAll(value: boolean) {
		this.addGetAll = value;
	}

	public setAddGetById(value: boolean) {
		this.addGetById = value;
	}

	public setAddPost(value: boolean) {
		this.addPost = value;
	}

	public setAddUpdate(value: boolean) {
		this.addUpdate = value;
	}

	public setAddDelete(value: boolean) {
		this.addDelete = value;
	}

}