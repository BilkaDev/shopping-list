import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./user.entity";
import { RegisterUserResponse } from "../interfaces";
import { hashPwd, randomSalz } from "../utils/hash-pwd";

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
}
