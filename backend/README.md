
# Fulll TEST : Vehicle fleets


## Installation


 - To install all the dependencies.
```bash
$ npm install
```
 - To build the project :
```bash
$ npm run build 
```

 - [Install postgres](https://www.postgresql.org/download/linux/ubuntu/)

## Init database
First, if it's not done, start the db : 
```bash
$ sudo service postgresql start
```

To init the database :

```bash
$ npm run init-db
```

This will create the database. Do not forget to specify your database password in the infrastructure file : `src/infrastructure/repository/sequelize/fleet.repository.ts` in the constructor : 
```typescript
    constructor() {

        this._sequelize = new Sequelize({
            host: "localhost",
            database: "fleet_db",
            dialect: "postgres",
            username: "postgres",
            password: "XXXXTODEFINEXXX",   // <<<<<<<================
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
```

## Usage

To launch the test :

```
$ npm test
```



To switch from `in memory` to `postgresql` repository, change the in `src/app/app.ts` file with uncomment and comment these lines : 
```typescript
// keep this one for db
this.repository = new FleetSequelizeRepository();  
// keep this one for in memory
this.repository = new FleetInMemoryRepository();   
```

The CLI can be tested the following way : 

```bash
$ node out/src/app/index.js create userid
=> fleet_id_returned

$ node out/src/app/index.js localize-vehicle fleet_id vehicule_plate_num 

$ node out/src/app/index.js localize-vehicle fleet_id vehicule_plate_num 50 50
```