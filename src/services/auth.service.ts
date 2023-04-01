import { Promise } from "mongoose";

import { EActionTokenType, EEmailAction, ESmsActionEnum } from "../enums";
import { ApiErrors } from "../errors";
import { Action, OldPassword, Token, User } from "../models";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
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
      await emailService.sendMail(body.email, EEmailAction.WELCOME);
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
    try {
      const user: IUser = await User.findById(userId);

      const isMatched = await passwordService.compare(
        oldPassword,
        user.password
      );

      if (!isMatched) {
        throw new ApiErrors("Wrong old password", 400);
      }

      const hashedNewPassword = await passwordService.hash(newPassword);
      await User.updateOne({ _id: user._id }, { password: hashedNewPassword });
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.forgot
      );

      await Action.create({
        _user_id: user._id,
        actionToken,
        tokenType: EActionTokenType.forgot,
      });

      await emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, {
        token: actionToken,
      });

      await OldPassword.create({ _user_id: user._id, password: user.password });
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }

  public async setForgotPassword(
    password: string,
    id: string,
    token: string
  ): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);

      await User.updateOne({ _id: id }, { password: hashedPassword });

      await Action.deleteOne({
        actionToken: token,
        tokenType: EActionTokenType.forgot,
      });
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }

  public async sendActiveToken(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.activate
      );

      await Action.create({
        _user_id: user._id,
        actionToken,
        tokenType: EActionTokenType.activate,
      });

      await emailService.sendMail(user.email, EEmailAction.ACTIVE, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }

  public async activate(userId: string): Promise<void> {
    try {
      await User.updateOne(
        { _id: userId },
        { $set: { status: EActionTokenType.activate } }
      );

      await Action.deleteMany({
        _user_id: userId,
        tokenType: EActionTokenType.activate,
      });
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
