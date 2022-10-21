import { Given, When, Then } from "@cucumber/cucumber";
import { assert } from "chai"
import LocalizationFactory from "../src/domain/factory/localization.factory";


Given('a location', function () {
    this.a_localization = LocalizationFactory.create(50, 100);
});

When('I park my vehicle at this location', async function () {
    await this.app.app_service.parkVehicleAtLocation(this.my_fleet.id, 
        this.a_vehicle_id, 
        this.a_localization.latitude, 
        this.a_localization.longitude);
    });


Then('the known location of my vehicle should verify this location', async function () {
    const vehicle = await this.app.repository.findVehicle(this.a_vehicle_id);
    if (vehicle && vehicle.localization) {
        assert.isTrue(vehicle.localization.equals(this.a_localization));
    }
});


Given('my vehicle has been parked into this location', async function () {

    await this.app.app_service.parkVehicleAtLocation(this.my_fleet.id, 
        this.a_vehicle_id, 
        this.a_localization.latitude, 
        this.a_localization.longitude);
});


When('I try to park my vehicle at this location', async function () {
    this.park_same_location_error = false;
    try {
        await this.app.app_service.parkVehicleAtLocation(this.my_fleet.id, 
            this.a_vehicle_id, 
            this.a_localization.latitude, 
            this.a_localization.longitude);    }
    catch (e) {
        if (e instanceof Error  && 
            e.message ===`error : trying to park the vehicle "${this.a_vehicle_id}" twice at the same location (${this.a_localization.latitude},${this.a_localization.longitude})`){
            this.park_same_location_error = true;
        }
    }
});



Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.isTrue(this.park_same_location_error);
});