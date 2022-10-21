
import { v4 as uuid } from 'uuid';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: string;
  public props: T;

  constructor (props: T, id?: string) {
    this._id = id ? id : uuid();
    this.props = props;
    this.validate()
  }

  public equals (object?: Entity<T>) : boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }
}