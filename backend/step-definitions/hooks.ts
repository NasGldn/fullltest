
import { Before, After } from "@cucumber/cucumber";
import { App } from "../src/app/app";


Before(async function () {
    this.app = new App();
    await this.app.start()
})

After(async function () {
    await this.app.stop()
})