import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiErrors } from "../errors";
import { User } from "../models";
import { IRequest } from "../types";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new ApiErrors("User not found", 422);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public getDynamicallyAndTrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });

        if (user) {
          throw new ApiErrors(
            `User with ${fieldName} ${fieldValue} already exist`,
            409
          );
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public getDynamicallyOrTrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });

        if (!user) {
          throw new ApiErrors(`User not found`, 422);
        }

        req.res.locals = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  // Validators
  public async isIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiErrors("ID not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        throw new ApiErrors(error.message, 400);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUser.validate(req.body);

      if (error) {
        throw new ApiErrors(error.message, 400);
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.loginUser.validate(req.body);

      if (error) {
        throw new ApiErrors(error.message, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
