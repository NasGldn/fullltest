import { App } from "../app";

export async function create(user_id : string): Promise<string> {
    const app = new App();
    await app.start()

    const fleet = await app.app_service.createFleetFromUserId(user_id)

    await app.stop();
    return fleet.id
}