"use strict";
var handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
module.exports = {
    transport: {
        host: "localhost",
        port: 2500,
        ignoreTLS: true,
        secure: false,
        auth: {
            user: "user",
            pass: "pwd"
        }
    },
    defaults: {
        from: "admin@test.example.com"
    },
    template: {
        dir: "./templates/email",
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true
        }
    }
};
