import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export = {
  transport: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    ignoreTLS: true,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PWD,
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
