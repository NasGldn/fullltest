import { Entity } from "./entity";
import Vehicle from "./vehicle";

interface FleetProps {
  _userId : string,
  _vehicles?: Vehicle[]
}

export default class Fleet extends Entity<FleetProps> {

  constructor(props: FleetProps, id?: string) {
    super(props, id)
  }
  get userId(): string {
    return this.props._userId;
  }
  get id(): string {
    return this._id;
  }

  get vehicles() : Vehicle[] | undefined {
    return this.props._vehicles
  }

  addVehicle(vehicle : Vehicle) : void  {
    if (!this.props._vehicles) {
      this.props._vehicles = [];
    }
    this.props._vehicles.push(vehicle);
  }

  containsVehicle(vehicle_plate_number : string) : boolean {
    if (!this.props._vehicles) {
      return false;    
    }
    return (this.props._vehicles.some( vehicle => {
      if (vehicle.vehiclePlateNumber === vehicle_plate_number){
        return true;
      }
      return false;
    }));
  }
}