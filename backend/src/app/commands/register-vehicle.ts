import { App } from "../app";

/**
 * register vehicle command
 * @param cmd 
 * @param params 
 * @returns 
 */
export async function registerVehicule(fleet_id : string, vehicle_plate_number:string) : Promise<void> {

    const app = new App();
    await app.start()

    await app.app_service?.registerVehicleInFleet(fleet_id, vehicle_plate_number);
    
    await app.stop();
    return;
}