"use strict";
exports.__esModule = true;
exports.dataSource = void 0;
var typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
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
        migrationsDir: "migrations"
    }
});
