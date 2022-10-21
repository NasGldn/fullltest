
import {
    Table,
    Model,
    Column,
    ForeignKey,

  } from "sequelize-typescript";
import FleetModel from "./fleet.model";
import VehicleModel from "./vehicle.model";

@Table({
  tableName: "fleets_vehicles",
  timestamps: false,
})
export default class FleetVehicleModel extends Model {
    @ForeignKey(() => FleetModel)
    @Column
    declare fleetId: string;
  
    @ForeignKey(() => VehicleModel)
    @Column
    declare vehicleId: string;
}