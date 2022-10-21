import Fleet from "../entity/fleet";
import Vehicle from "../entity/vehicle";
import Localization from "../valueobject/localization";

export default interface FleetRepositoryInterface {  

    start() : Promise<void>;

    stop() : Promise<void>;

    createFleet(fleet: Fleet): Promise<Fleet>;

    createVehicle(vehicle: Vehicle): Promise<Vehicle>;

    findFleet(fleetId: string): Promise<Fleet>;

    findVehicle(vehicleId: string): Promise<Vehicle>;

    registerVehicleInFleet(fleetId: string, vehicleId: string): Promise<void>;
    
    setVehicleLocation(vehicleId: string, localization: Localization): Promise<void>;
}