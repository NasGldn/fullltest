import Localization from "../valueobject/localization";

export default class LocalizationFactory {
  public static create(latitude: number, longitude:number): Localization {
    return new Localization({
        _latitude: latitude,
        _longitude:longitude
    });
  }
}