import Fleet from "../../../domain/entity/fleet";
import Vehicle from "../../../domain/entity/vehicle";
import FleetModel from "./fleet.model";
import VehicleModel from "./vehicle.model";
import FleetRepositoryInterface from "../../../domain/repository/fleet.repository.interface";
import Localization from "../../../domain/valueobject/localization";
import { Sequelize } from "sequelize-typescript";
import FleetVehicleModel from "./fleet_vehicle.model";

export default class FleetSequelizeRepository implements FleetRepositoryInterface {

    private _sequelize : Sequelize;
    get sequelize(): Sequelize | undefined {
        return this._sequelize;
    }

    constructor() {

        this._sequelize = new Sequelize({
            host: "localhost",
            database: "fleet_db",
            dialect: "postgres",
            username: "postgres",
            password: "XXXXTODEFINEXXX",
            models: [FleetModel, VehicleModel, FleetVehicleModel],
            logging: false,
            pool : {
                max: 5,
                min: 0,
                idle: 100000,
                acquire: 50000,
            }
        });
    }
    

    async start() : Promise<void>{

        this._sequelize.sync()
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            }); 


    }


    async stop() : Promise<void>{
        this._sequelize.close()
    }

    async createFleet(fleet: Fleet): Promise<Fleet> {
        const createdFleet = await FleetModel.create({
            id: fleet.id,
            user_id: fleet.userId
        })
        if (!createdFleet){
            throw new Error("Error during Fleet creation.");
        } 

        return createdFleet.toEntity();
    }

    async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
        const createdVehicle = await VehicleModel.create({
            vehicle_plate_number: vehicle.vehiclePlateNumber
        })
        if (!createdVehicle){
            throw new Error("Error during Vehicle creation")
        }

        return createdVehicle.toEntity();

    }

    async findFleet(fleetId: string): Promise<Fleet> {
        const foundFleet = await FleetModel.findByPk(fleetId);
        if (!foundFleet){
            throw new Error(`Cannot find Fleet with id=${fleetId}.`)
        }

        return await foundFleet.toEntity(); 
    }

    async findVehicle(vehiclePlateNumber: string): Promise<Vehicle> {
        const foundVehicle = await VehicleModel.findOne({
            where: { vehicle_plate_number: vehiclePlateNumber },
        });
        if (!foundVehicle){
            throw new Error(`Cannot find Vehicle with plate=${vehiclePlateNumber}.`)
        } 

        return foundVehicle.toEntity(); 
    }

    async registerVehicleInFleet(fleetId: string, vehiclePlateNumber: string): Promise<void> {
        const fleets_vehicles = await FleetVehicleModel.create({
            fleetId: fleetId,
            vehicleId: vehiclePlateNumber,
        })     
        if (!fleets_vehicles){
            throw new Error(`Cannot add vehicle=${vehiclePlateNumber} in ${fleetId}.`)
        }     

    }
    
    async setVehicleLocation(vehiclePlateNumber: string, localization: Localization): Promise<void> {
        const foundVehicle = await VehicleModel.findOne({
            where : { vehicle_plate_number: vehiclePlateNumber }
        });
        if (!foundVehicle) {
            throw {
                message: `Cannot find Vehicle with plate_number=${vehiclePlateNumber}.`,
              }        
        }
        foundVehicle.latitude = localization.latitude;
        foundVehicle.longitude = localization.longitude;
        await foundVehicle.save();
    }
}
