import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { ApiErrors } from "../errors";
import { Token } from "../models";
import { tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      const jwtPayload = tokenService.checkToken(accessToken);

      const tokenInfo = await Token.findOne({ accessToken });

      if (!accessToken) {
        throw new ApiErrors("No token", 401);
      }

      if (!tokenInfo) {
        throw new ApiErrors("Token not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );

      const tokenInfo = await Token.findOne({ refreshToken });

      if (!refreshToken) {
        throw new ApiErrors("No token", 401);
      }

      if (!tokenInfo) {
        throw new ApiErrors("Token not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
