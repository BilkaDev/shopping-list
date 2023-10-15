import { DataSource, DataSourceOptions } from "typeorm";

export const dataSource = new DataSource({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/**/**.entity{.ts,.js}"],
  logging: true,
  bigNumberStrings: false,
  synchronize: true,
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "migrations",
  },
} as DataSourceOptions);
