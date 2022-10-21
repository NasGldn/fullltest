import {
    Table,
    Model,
    PrimaryKey,
    Column,
    BelongsToMany,
  } from "sequelize-typescript";
import Fleet from "../../../domain/entity/fleet";
import FleetFactory from "../../../domain/factory/fleet.factory";
import FleetVehicleModel from "./fleet_vehicle.model";
  
  import VehicleModel from "./vehicle.model";
  
  @Table({
    tableName: "fleets",
    timestamps: false,
  })
  export default class FleetModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare user_id: string;
  
    @BelongsToMany(() => VehicleModel, () => FleetVehicleModel)
    declare vehicles: VehicleModel[];

    toEntity = async () : Promise<Fleet> => {
      const vehicleList = await this.$get("vehicles");
      if (!vehicleList || vehicleList.length===0){
        return  FleetFactory.create(this.id, this.user_id);
      }
      const vehicles = vehicleList.map(vehicle => vehicle.toEntity());
      return  FleetFactory.create(this.id, this.user_id, vehicles);
    }
  }


