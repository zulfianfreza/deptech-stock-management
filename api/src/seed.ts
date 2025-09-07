import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './seeders/seeder.module';
import { DatabaseSeeder } from './seeders/database.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const seeder = app.get(DatabaseSeeder);
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
