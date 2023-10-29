import { BadRequestException, Inject, Injectable, ConflictException } from "@nestjs/common";
import * as argon2 from "argon2";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";
import { AddAvatarResponse, ChangePasswordResponse, RecoverPasswordResponse, RegisterUserResponse } from "../interfaces";
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
      user.pwdHash = await argon2.hash(newUser.pwd);
      await user.save();
      await this.mailService.sendMail(newUser.email, "User registered", singUpEmailTemplate());
      return { id: user.id, email: user.email };
    } else {
      throw new ConflictException("email is already in use");
    }
  }

  async changePassword({ pwd, newPwd }: ChangePasswordDto, user: User): Promise<ChangePasswordResponse> {
    const isValidPassword = await argon2.verify(user.pwdHash, pwd);
    if (isValidPassword) {
      throw new BadRequestException("Incorrect credentials.");
    }
    user.pwdHash = await argon2.hash(newPwd);
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
    user.pwdHash = await argon2.hash(password);
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
        return res.status(400).json({
          status: 400,
          message: "No photo in this entity!",
        });
      }
      return res.sendFile(user.photoFn, {
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
