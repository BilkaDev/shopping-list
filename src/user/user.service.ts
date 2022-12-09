import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
import { singUpEmailTemplate } from "../templates/sing-up";

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
      await this.mailService.sendMail(newUser.email, "recover password", singUpEmailTemplate());
      return { id: user.id, email: user.email };
    } else {
      throw new NotFoundException("email is already in use");
    }
  }

  async changePassword({ pwd, newPwd }: ChangePasswordDto, user: User): Promise<ChangePasswordResponse> {
    if (user.pwdHash != hashPwd(pwd, user.salz)) {
      throw new BadRequestException("Incorrect credentials.");
    }
    user.pwdHash = hashPwd(newPwd, user.salz);
    await user.save();
    return {
      message: "Password has changed successfully!",
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
        message: "If e-mail is active then the message was sent",
      };
    }

    const password = randomPassword();
    user.pwdHash = hashPwd(password, user.salz);
    await user.save();

    await this.mailService.sendMail(recover.email, "recover password", recoverPasswordEmailTemplate(password));

    return {
      message: "If e-mail is active then the message was sent",
    };
  }

  async addAvatar(user: User, files: MulterDiskUploadedFiles): Promise<AddAvatarResponse> {
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
      return { message: "Avatar saved successfully!" };
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
        res.status(400).json({
          status: 400,
          message: "No photo in this entity!",
        });
      }
      res.sendFile(user.photoFn, {
        root: path.join(storageDir(), "avatar-photos"),
      });
    } catch (e) {
      res.json({
        status: 500,
        message: "Something went wrong. Please try again later!",
      });
    }
  }
}
