import Fleet from "../domain/entity/fleet";
import Vehicle from "../domain/entity/vehicle";
import FleetFactory from "../domain/factory/fleet.factory";
import LocalizationFactory from "../domain/factory/localization.factory";
import VehicleFactory from "../domain/factory/vehicle.factory";
import FleetRepositoryInterface from "../domain/repository/fleet.repository.interface";

export default class AppService {
    private rep: FleetRepositoryInterface;


    constructor(rep: FleetRepositoryInterface) {
        this.rep = rep;
    }


     async createFleetFromUserId(userId: string): Promise<Fleet> {
        const fleet = FleetFactory.createWithUserId(userId);
        const createdFleet = await this.rep.createFleet(fleet);
        return createdFleet;
    }



     async registerVehicleInFleet(fleet_id: string, vehicle_plate_number: string): Promise<void> {

        const fleet = await this.rep.findFleet(fleet_id)
        let vehicle : Vehicle;
        try {
            vehicle = await this.rep.findVehicle(vehicle_plate_number);
        } catch {
            vehicle = VehicleFactory.create(vehicle_plate_number);
            vehicle = await this.rep.createVehicle(vehicle);
        }

        if (!fleet.vehicles){
            await this.rep.registerVehicleInFleet(fleet.id, vehicle.vehiclePlateNumber);
            return;
        }

        if (fleet.containsVehicle(vehicle.vehiclePlateNumber)) {
            throw new Error(`error : vehicle "${vehicle.vehiclePlateNumber}" is already registered to fleet "${fleet.id}.`);
        }
    }


     async parkVehicleAtLocation(fleet_id: string, vehicle_plate_number : string, lat: number, long: number): Promise<void> {

        const vehicle = await this.rep.findVehicle(vehicle_plate_number)
        const localization = LocalizationFactory.create(lat, long)

        if (vehicle.canBeParkedAt(localization)){
            await this.rep.setVehicleLocation(vehicle.vehiclePlateNumber,localization);
            return;
        } else {
            throw new Error(`error : trying to park the vehicle "${vehicle.vehiclePlateNumber}" twice at the same location (${localization.latitude},${localization.longitude})`);
        }
    }
}