import Fleet from "../../../domain/entity/fleet";
import Vehicle from "../../../domain/entity/vehicle";
import FleetRepositoryInterface from "../../../domain/repository/fleet.repository.interface";
import Localization from "../../../domain/valueobject/localization";


export default class FleetInMemoryRepository implements FleetRepositoryInterface {

    
    private fleets: Map<string, Fleet> = new Map<string, Fleet>();
    private vehicles: Map<string, Vehicle> = new Map<string, Vehicle>();
    private fleets_vehicles = new Map<string, Array<string>>

    async start() : Promise<void>{
        return;
    }

    async stop() : Promise<void>{
        return;
    }

    async createFleet(fleet: Fleet): Promise<Fleet> {
        this.fleets.set(fleet.id, fleet);
        const  createdFleet = await this.findFleet(fleet.id);
        if (!createdFleet){
            throw new Error("Error during Fleet creation")
        } 
        return createdFleet;

    }

    async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
        this.vehicles.set(vehicle.vehiclePlateNumber, vehicle);
        const  createdVehicle = await this.findVehicle(vehicle.vehiclePlateNumber);
        if (!createdVehicle){
            throw new Error("Error during Vehicle creation")
        } 
        return createdVehicle;

    }

    async findFleet(fleetId: string): Promise<Fleet> {
        const fleet = this.fleets.get(fleetId)
        if (!fleet){
            throw new Error(`Cannot find Fleet with id=${fleetId}.`)
        }
        return fleet;
    }

    async findVehicle(vehiclePlateNumber: string): Promise<Vehicle> {
        const vehicle = await this.vehicles.get(vehiclePlateNumber)
        if (!vehicle){
            throw new Error(`Cannot find Vehicle with plate=${vehiclePlateNumber}.`)
        }
        return vehicle;
    }

    async registerVehicleInFleet(fleetId: string, vehiclePlateNumber: string): Promise<void> {
        const fleet = await this.findFleet(fleetId);
        const vehicle = await this.findVehicle(vehiclePlateNumber);
        fleet.addVehicle(vehicle)
    }
    
    async setVehicleLocation(vehiclePlateNumber: string, localization: Localization): Promise<void> {
        const vehicle = await this.vehicles.get(vehiclePlateNumber);
        if (vehicle){
            vehicle.changeLocalization(localization);
            await this.vehicles.set(vehiclePlateNumber, vehicle);
        }
    }

}
