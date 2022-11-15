import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";
import { ChangePasswordResponse, RecoverPasswordResponse, RegisterUserResponse } from "../interfaces";
import { hashPwd, randomSalz } from "../utils/hash-pwd";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { randomPassword } from "../utils/random-password";
import { RecoverPasswordDto } from "./dto/recover-password.dto";

@Injectable()
export class UserService {
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

    // this.mailService.sendMail(
    //     recover.email,
    //     'recover password,
    //     `<p>Twoje nowe hasło to:${password}</p>`,
    // );

    return {
      isSuccess: true,
    };
  }
}
