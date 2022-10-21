import FleetRepositoryInterface from "../domain/repository/fleet.repository.interface";
import FleetInMemoryRepository from "../infrastructure/repository/inmemory/fleet.repository";
import FleetSequelizeRepository from "../infrastructure/repository/sequelize/fleet.repository";
import AppService from "./service";

export class App {

    public repository: FleetRepositoryInterface;
    public app_service: AppService;

    constructor() {
        //this.repository = new FleetSequelizeRepository();
        this.repository = new FleetInMemoryRepository();
        this.app_service = new AppService(this.repository)
    }

    async start(){
        await this.repository!.start();
    }

    async stop(){
        await this.repository!.stop();
    }

}