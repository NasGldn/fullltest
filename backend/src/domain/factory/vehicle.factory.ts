import Vehicle from "../entity/vehicle";
import LocalizationFactory from "./localization.factory";

export default class VehicleFactory {
  public static create(vehiclePlateNumber: string, latitude? : number, longitude? : number): Vehicle {
    const vehicle = new Vehicle({},vehiclePlateNumber);
    if (latitude && longitude){
      const localization = LocalizationFactory.create(latitude, longitude);
      vehicle.changeLocalization(localization)
    }
    return vehicle;
  }
}