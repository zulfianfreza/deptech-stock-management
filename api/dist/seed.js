"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const database_seeder_1 = require("./seeders/database.seeder");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seeder = app.get(database_seeder_1.DatabaseSeeder);
    await seeder.run();
    await app.close();
}
bootstrap()
    .then(() => {
    console.log('Seeder completed successfully!');
    process.exit(0);
})
    .catch((error) => {
    console.error('Seeder failed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map