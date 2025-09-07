import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 8889,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "product_stock_db",
  entities: [__dirname + "/../modules/**/*.entity{.ts,.js}"],
  synchronize: process.env.NODE_ENV !== "production", // Only for development
  logging: process.env.NODE_ENV === "development",
};
