import Localization from "../valueobject/localization";
import { Entity } from "./entity";

interface VehicleProps {
  _localization?: Localization;
}

export default class Vehicle extends Entity<VehicleProps> {

  constructor(props: VehicleProps, vehiclePlateNumber?: string) {
    super(props, vehiclePlateNumber)
  }

  get vehiclePlateNumber(): string {
    return this._id;
  }

  get localization(): Localization | undefined {
    return this.props._localization;
  }

  changeLocalization(localization: Localization) {
    this.props._localization = localization;
  }

  canBeParkedAt(localization: Localization) : boolean {
    if (!this.props._localization){
      return true;
    }
    return !localization.equals(this.props._localization)

  }

}