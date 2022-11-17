import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";
import { AddAvatarResponse, ChangePasswordResponse, RecoverPasswordResponse, RegisterUserResponse } from "../interfaces";
import { hashPwd, randomSalz } from "../utils/hash-pwd";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { randomPassword } from "../utils/random-password";
import { RecoverPasswordDto } from "./dto/recover-password.dto";
import { MailService } from "../mail/mail.service";
import { recoverPasswordEmailTemplate } from "../templates/recover-password";
import { MulterDiskUploadedFiles } from "../interfaces/files";
import * as fs from "fs/promises";
import * as path from "path";
import { storageDir } from "../utils/storage";

@Injectable()
export class UserService {
  constructor(@Inject(MailService) private mailService: MailService) {}
  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const checkEmail = await User.findOne({ where: { email: newUser.email } });
    if (!checkEmail && newUser.email.length > 0) {
      const user = new User();
      user.email = newUser.email;
      const salz = randomSalz(128);
      user.pwdHash = hashPwd(newUser.pwd, salz);
      user.salz = salz;
      await user.save();
      return user;
    } else {
      return { isSuccess: false, message: "email is already in use" };
    }
  }

  async getOneUser(id: string): Promise<User> {
    return await User.findOne({ where: { id } });
  }

  async changePassword(newPwd: ChangePasswordDto, user: User): Promise<ChangePasswordResponse> {
    if (user.pwdHash != hashPwd(newPwd.pwd, user.salz)) {
      return { isSuccess: false };
    }
    user.pwdHash = hashPwd(newPwd.newPwd, user.salz);
    await user.save();
    return {
      isSuccess: true,
    };
  }

  async recover(recover: RecoverPasswordDto): Promise<RecoverPasswordResponse> {
    const user = await User.findOne({
      where: {
        email: recover.email,
      },
    });

    if (!user) {
      return {
        isSuccess: false,
      };
    }

    const password = randomPassword();
    user.pwdHash = hashPwd(password, user.salz);
    await user.save();

    await this.mailService.sendMail(recover.email, "recover password", recoverPasswordEmailTemplate(password));

    return {
      isSuccess: true,
    };
  }

  async addAvatar(user, files: MulterDiskUploadedFiles): Promise<AddAvatarResponse> {
    const photo = files?.photo?.[0] ?? null;
    try {
      if (user.photoFn) {
        try {
          await fs.unlink(path.join(storageDir(), "avatar-photos", user.photoFn));
          user.photoFn = null;
          await user.save();
        } catch (e2) {}
      }
      if (photo) {
        user.photoFn = photo.filename;
      }
      await user.save();
      return { isSuccess: true };
    } catch (e) {
      try {
        console.error(e);
        if (photo) {
          await fs.unlink(path.join(storageDir(), "avatar-photos", photo.filename));
        }
      } catch (e2) {}
      throw e;
    }
  }

  async getPhoto(user: User, res: any) {
    try {
      if (!user.photoFn) {
        res.json({
          isSuccess: false,
          message: "No photo in this entity!",
        });
      }
      res.sendFile(user.photoFn, {
        root: path.join(storageDir(), "avatar-photos"),
      });
    } catch (e) {
      res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }
}
