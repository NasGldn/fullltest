import {
    Table,
    Model,
    PrimaryKey,
    Column,
    BelongsToMany,
  } from "sequelize-typescript";
import Vehicle from "../../../domain/entity/vehicle";
import VehicleFactory from "../../../domain/factory/vehicle.factory";
  import FleetModel from "./fleet.model";
import FleetVehicleModel from "./fleet_vehicle.model";
  
  
  @Table({
    tableName: "vehicles",
    timestamps: false,
  })
  export default class VehicleModel extends Model {
    @PrimaryKey
    @Column
    declare vehicle_plate_number: string;

    @Column
    declare latitude: number;

    @Column
    declare longitude: number;
  
    @BelongsToMany(() => FleetModel, () => FleetVehicleModel)
    declare fleets: FleetModel[];

    
    toEntity = () : Vehicle =>
    VehicleFactory.create(
      this.vehicle_plate_number, 
      this.latitude,
      this.longitude);
  }