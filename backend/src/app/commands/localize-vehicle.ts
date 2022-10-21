import { App } from "../app";

/**
 * localize vehicle command
 * @param cmd 
 * @param params 
 * @returns 
 */
export async function localizeVehicle(
    fleet_id : string, 
    vehicle_plate_number : string, 
    lat:number, 
    long:number)  : Promise<void> {

    const app = new App();
    await app.start()

    await app.app_service?.parkVehicleAtLocation(fleet_id, vehicle_plate_number,lat, long);

    await app.stop();
    return;
}