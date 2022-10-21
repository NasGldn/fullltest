import Fleet from "../entity/fleet";
import Vehicle from "../entity/vehicle";

export default class FleetFactory {
  public static createWithUserId(userId : string): Fleet {
    return new Fleet({
      _userId : userId
    });
  }

  public static create(id: string, userId : string, vehicles? : Vehicle[]): Fleet {
    const props :  {[Key: string]: any} = {
      _userId : userId,
    };
    if (vehicles){
      props["_vehicles"] = vehicles;
    }
    return new Fleet({
      _userId : userId,
      _vehicles : vehicles
    }, id);
  }


}