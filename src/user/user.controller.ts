import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "./user.service";
import { ChangePasswordResponse, RegisterUserResponse } from "../interfaces";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post("/")
  register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(newUser);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/edit")
  changePassword(@Body() newPwd: ChangePasswordDto, @UserObj() user: User): Promise<ChangePasswordResponse> {
    return this.userService.changePassword(newPwd, user);
  }
}
