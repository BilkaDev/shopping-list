import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { AuthLoginDto } from "./dto/auth-login";
import { Response } from "express";
import { User } from "../user/user.entity";
import { JwtPayload } from "./jwt.strategy";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { CONFIG } from "../config/client-config";

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
        return res.status(400).json({
          status: 400,
          message: "Wrong e-mail.",
        });
      }

      if (req.pwd.length < 6) {
        return res.status(400).json({
          status: 400,
          message: "The password must not be shorter than 6 characters",
        });
      }

      const user = await User.findOne({
        where: {
          email: req.email,
        },
      });

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "Incorrect login credentials!",
        });
      }

      const isValidPassword = await argon2.verify(user.pwdHash, req.pwd);

      if (!isValidPassword) {
        return res.status(400).json({
          status: 400,
          message: "Incorrect login credentials!",
        });
      }

      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie("jwt", token.accessToken, {
          secure: CONFIG.secure,
          domain: CONFIG.domain,
          httpOnly: true,
        })
        .json({
          status: 200,
          data: {
            user: {
              userId: user.id,
              email: user.email,
            },
          },
        });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again later",
      });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();

      res.clearCookie("jwt", {
        secure: CONFIG.secure,
        domain: CONFIG.domain,
        httpOnly: true,
      });

      return res.json({ status: 200, data: { message: "Login successful!" } });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: e.message,
      });
    }
  }

  async autoLogin(user: User, res: Response) {
    const token = this.createToken(await this.generateToken(user));
    return res
      .cookie("jwt", token.accessToken, {
        secure: CONFIG.secure,
        domain: CONFIG.domain,
        httpOnly: true,
      })
      .json({
        status: 200,
        data: { user: { userId: user.id, email: user.email } },
      });
  }

  async testUserLogin(res: Response) {
    try {
      const user = await User.findOne({
        where: {
          email: "test@example.com",
        },
      });

      const token = this.createToken(await this.generateToken(user));
      return res
        .cookie("jwt", token.accessToken, {
          secure: CONFIG.secure,
          domain: CONFIG.domain,
          httpOnly: true,
        })
        .json({
          status: 200,
          data: {
            user: {
              userId: user.id,
              email: user.email,
            },
          },
        });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again later",
      });
    }
  }
}
