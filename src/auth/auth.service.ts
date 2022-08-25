import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login";
import { Response } from "express";
import { User } from "../user/user.entity";
import { hashPwd } from "../utils/hash-pwd";
import { JwtPayload } from "./jwt.strategy";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.JWT_KEY, { expiresIn });

    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;

    do {
      token = uuid();
      userWithThisToken = await User.findOne({
        where: {
          currentTokenId: token,
        },
      });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response) {
    try {
      if (!req.email.includes("@")) {
        return res.json({
          isSuccess: false,
          message: "Wrong e-mail.",
        });
      }

      if (req.pwd.length < 6) {
        return res.json({
          isSuccess: false,
          message: "The password must not be shorter than 6 characters",
        });
      }

      const user = await User.findOne({
        where: {
          email: req.email,
        },
      });

      if (!user) {
        return res.json({
          isSuccess: false,
          message: "Incorrect login credentials!",
        });
      }

      const password = hashPwd(req.pwd, user.salz);
      if (user.pwdHash !== password) {
        return res.json({
          isSuccess: false,
          message: "Incorrect login credentials!",
        });
      }

      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie("jwt", token.accessToken, {
          secure: false,
          domain: "localhost",
          httpOnly: true,
        })
        .json({
          isSuccess: true,
          userId: user.id,
        });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }
}
