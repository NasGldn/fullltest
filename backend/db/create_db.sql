
DROP DATABASE fleet_db;
CREATE DATABASE fleet_db;

DROP TABLE IF EXISTS fleets CASCADE;

CREATE TABLE fleets (
  id varchar(128) PRIMARY KEY
);

DROP TABLE IF EXISTS vehicles CASCADE;

CREATE TABLE vehicles (
  vehicle_plate_number varchar(128) PRIMARY KEY,
  latitude numeric DEFAULT NULL,
  longitude numeric DEFAULT NULL
);

DROP TABLE IF EXISTS fleets_vehicles;

CREATE TABLE fleets_vehicles (
  fleetId varchar(128)  REFERENCES fleets (id) ON UPDATE CASCADE ON DELETE CASCADE,
  vehicleId varchar(128) REFERENCES vehicles (vehicle_plate_number) ON UPDATE CASCADE,
  CONSTRAINT fleets_vehicles_pkey PRIMARY KEY (fleetId, vehicleId)
) ;


