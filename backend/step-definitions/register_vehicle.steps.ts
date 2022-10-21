//const assert = require("assert");
import { Given, When, Then, Before } from "@cucumber/cucumber";
import { assert } from "chai"

import FleetFactory from "../src/domain/factory/fleet.factory";
import VehicleFactory from "../src/domain/factory/vehicle.factory";

function createRandomVehiculePlateNumber() {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789'
    for ( let i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    for ( let i = 0; i < 3; i++ ) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}

Given('my fleet', async function () {
    this.my_user_id = "sergentHartmann";
    this.my_fleet = await this.app.app_service.createFleetFromUserId(this.my_user_id);
});


Given('a vehicle', async function () {
    // const vehicle = VehicleFactory.create(createRandomVehiculePlateNumber());
    // this.a_vehicle = await this.app.repository.createVehicle(vehicle);
    this.a_vehicle_id = createRandomVehiculePlateNumber();
});


When('I register this vehicle into my fleet', async function () {
    await this.app.app_service.registerVehicleInFleet(this.my_fleet.id, this.a_vehicle_id);
    this.a_vehicle = await this.app.repository.findVehicle(this.a_vehicle_id);
});


Then('this vehicle should be part of my vehicle fleet', async function () {
    this.my_fleet = await this.app.repository.findFleet(this.my_fleet.id);
    const do_include_vehicle = await  this.my_fleet.containsVehicle(this.a_vehicle.vehiclePlateNumber);
    assert.isTrue(do_include_vehicle, "vehicle not founded in fleet");
});


Given('I have registered this vehicle into my fleet', async function () {
    await this.app.app_service.registerVehicleInFleet(this.my_fleet.id, this.a_vehicle_id);
});


When('I try to register this vehicle into my fleet', async function () {
    this.already_registered = false;
    try {
        await this.app.app_service.registerVehicleInFleet(this.my_fleet.id, this.a_vehicle_id);
    }
    catch (e) {
        if (e instanceof Error && 
            e.message ===`error : vehicle "${this.a_vehicle_id}" is already registered to fleet "${this.my_fleet.id}.`){
            this.already_registered = true;
        }
    }
});


Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.isTrue(this.already_registered);

});

Given('the fleet of another user', async function () {
    this.other_user_id = "colonelWhatsapp";
    this.other_user_fleet = await this.app.app_service.createFleetFromUserId(this.my_user_id);
});

Given('this vehicle has been registered into the other user\'s fleet', async function () {

    await this.app.app_service.registerVehicleInFleet(this.other_user_fleet.id, this.a_vehicle_id);

});