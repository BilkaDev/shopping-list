import { Body, Controller, Get, Inject, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "./user.service";
import { AddAvatarResponse, ChangePasswordResponse, RecoverPasswordResponse, RegisterUserResponse } from "../interfaces";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "./user.entity";
import { RecoverPasswordDto } from "./dto/recover-password.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { multerFileFilter, multerStorage, storageDir } from "../utils/storage";
import { MulterDiskUploadedFiles } from "../interfaces/files";

@Controller("user")
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post("/")
  register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return this.userService.register(newUser);
  }

  @Post("/recover")
  recoverPassword(@Body() recover: RecoverPasswordDto): Promise<RecoverPasswordResponse> {
    return this.userService.recover(recover);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/edit")
  changePassword(@Body() newPwd: ChangePasswordDto, @UserObj() user: User): Promise<ChangePasswordResponse> {
    return this.userService.changePassword(newPwd, user);
  }

  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: "photo",
          maxCount: 1,
        },
      ],
      {
        storage: multerStorage(path.join(storageDir(), "avatar-photos")),
        fileFilter: multerFileFilter,
        limits: { fileSize: 512 * 1024 },
      },
    ),
  )
  @Post("/avatar")
  addAvatar(@UserObj() user: User, @UploadedFiles() files: MulterDiskUploadedFiles): Promise<AddAvatarResponse> {
    return this.userService.addAvatar(user, files);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/avatar")
  async getPhoto(@Res() res: any, @UserObj() user: User): Promise<any> {
    return this.userService.getPhoto(user, res);
  }
}
