import { UserCollection } from './routes/User'
import { SectorCollection } from './routes/Sector'
import { Collection } from './routes/Collection'
import { NotificationCollection } from './routes/Notification';
import { MenuItemCollection } from './routes/MenuItem';

export class Routes {
  private collections : Array<Collection>;

  constructor() {
    this.collections = [];

    this.addCollection(new UserCollection())
    this.addCollection(new SectorCollection())
    this.addCollection(new NotificationCollection())
    this.addCollection(new MenuItemCollection())
  }

  public getCollections(): Array<Collection> {
	return this.collections;
  }
    
  public addCollection(value: Collection) {
	this.collections.push(value);
  }
  
}
