import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export = {
  transport: {
    host: "localhost",
    port: 2500,
    ignoreTLS: true,
    secure: false,
    auth: {
      user: "user",
      pass: "pwd",
    },
  },
  defaults: {
    from: "admin@test.example.com",
  },
  template: {
    dir: "./templates/email",
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
