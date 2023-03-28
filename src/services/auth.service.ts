import { Promise } from "mongoose";

import { EEmailAction, ESmsActionEnum } from "../enums";
import { ApiErrors } from "../errors";
import { Token, User } from "../models";
import { ITokenPair, ITokenPayload, IUser } from "../types";
import { ICredentials } from "../types/auth.types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });

      await smsService.sendSms(body.phone, ESmsActionEnum.WELCOME);
      await emailService.sendMail("gydini13@gmail.com", EEmailAction.WELCOME);
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const { password } = credentials;
      const isMatched = await passwordService.compare(password, user.password);

      if (!isMatched) {
        throw new ApiErrors("Invalid email or password", 400);
      }

      const tokenPair = tokenService.generateTokenPair({
        name: user.name,
        _id: user._id,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }
  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user: IUser = await User.findById(userId);

    const isMatched = await passwordService.compare(oldPassword, user.password);

    if (!isMatched) {
      throw new ApiErrors("Wrong old password", 400);
    }

    const hashedNewPassword = await passwordService.hash(newPassword);
    await User.updateOne({ _id: user._id }, { password: hashedNewPassword });
  }
}

export const authService = new AuthService();
