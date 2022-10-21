#! /usr/bin/env node


import { program, Command } from 'commander';
import { create } from "./commands/create"
import { registerVehicule } from "./commands/register-vehicle"
import { localizeVehicle } from "./commands/localize-vehicle"


const validateArgLength = (cmd : Command, length : number) : void => {
    if (cmd.args.length < length) {
        cmd.help();
    }
}

const mainCommand = new Command()

{
    const cmd = mainCommand.command('create <userId>')
        .description('create a fleet for userId. fleetId is returned on stdout.')
        .action(async () => {
            validateArgLength(cmd, 1);
            const user_id = cmd.args[0];

            try {
                const fleetId = await create(user_id);
                console.log(fleetId)
            }catch (err) {
                if (err instanceof Error){
                    console.error(err.message)
                }
            }

        });
}
{
    const cmd = mainCommand.command('register-vehicle <fleetId> <vehiclePlateNumber>')
        .description('create and register a vehicle in a fleet.')
        .action(async () => {

            validateArgLength(cmd, 2);
            const fleet_id = cmd.args[0];
            const vehicle_plate_number = cmd.args[1];

            try
            {
                await registerVehicule(fleet_id,vehicle_plate_number);
                console.log(`Vehicle with plate number ${vehicle_plate_number} has been successfully created and added to fleet(${fleet_id})`)
            } catch (err) {
                if (err instanceof Error){
                    console.error(err.message)
                }
            }

        });
}
{
    const cmd = mainCommand.command('localize-vehicle <fleetId> <vehiclePlateNumber> lat lng')
        .description('localize a vehicle in a fleet.')
        .action(async () => {
            validateArgLength(cmd, 4);
            const fleet_id = cmd.args[0];
            const vehicle_plate_number = cmd.args[1];
            const lat = parseFloat(cmd.args[2]);
            const long = parseFloat(cmd.args[3]);

            try {
                await localizeVehicle(fleet_id,vehicle_plate_number,lat,long);
                console.log(`Vehicle with plate number ${vehicle_plate_number} has been successfully located to ${lat} : ${long}`)
            } catch (err) {
                if (err instanceof Error){
                    console.error(err.message)
                }
            }
            //todo display message
        });
}

mainCommand.parse(process.argv);