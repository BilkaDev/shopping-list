import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "name database",
  entities: ["dist/**/**.entity{.ts,.js}"],
  logging: true,
  bigNumberStrings: false,
  synchronize: true,
});
