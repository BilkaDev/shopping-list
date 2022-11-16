import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MailModule } from "../mail/mail.module";

@Module({
  controllers: [UserController],
  imports: [MailModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
