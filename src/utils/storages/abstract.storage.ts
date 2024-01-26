import { utils } from 'mocha';
import Utils from '../../utils/helpers.js';
export class Storage<T extends { _id: string }> {
  protected storage: T[] = [];

  addEntity(entity: T): void {
    const entityIndex = this.findEntityIndex(entity._id);
    entityIndex !== -1 ? this.updateEntity(entity, entity._id) : this.storage.push(entity);
  }
  updateEntity(updatedEntity: T, _id: string): void {
    const entityIndex = this.findEntityIndex(_id);
    entityIndex !== -1 ? (this.storage[entityIndex] = updatedEntity) : console.log('Entity was not found');
  }

  deleteEntity(entity: string): void {
    const entityIndex = this.findEntityIndex(entity);
    entityIndex !== -1 ? this.storage.splice(entityIndex, 1) : console.log('Entity was not found');
  }

  getAllEntities(): T[] {
    return Utils.sortById(this.storage);
  }

  getEntity(entity: string) {
    const entityIndex = this.findEntityIndex(entity);
    return entityIndex !== -1 ? this.storage[entityIndex] : console.log(`Entity was not found`);
  }

  protected findEntityIndex(id: string): number {
    return this.storage.findIndex((entity: T) => entity._id === id);
  }
}
