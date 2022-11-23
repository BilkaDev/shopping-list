import { Controller, Post, Res, UseGuards, Body, Get } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { AuthService } from "./auth.service";
import { User } from "../user/user.entity";
import { LoginRequest } from "../interfaces";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async userLogin(@Body() req: LoginRequest, @Res() res: Response): Promise<any> {
    return this.authService.login(req, res);
  }

  @Post("/logout")
  @UseGuards(AuthGuard("jwt"))
  async logout(@UserObj() user: User, @Res() res: Response): Promise<any> {
    return this.authService.logout(user, res);
  }

  @Get("/auto-login")
  @UseGuards(AuthGuard("jwt"))
  async autoLogin(@UserObj() user: User, @Res() res: Response): Promise<any> {
    return this.authService.autoLogin(user, res);
  }
}
