import { NextFunction, Request, Response } from "express";

import { ApiErrors } from "../errors/api.errors";
import { User } from "../models/User.model";
import { userService } from "../services/user.service";

class UserMiddleware {
  public async getByIdAndTrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const user = User.findById(userId);

      if (!user) {
        throw new ApiErrors("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
  public async createAndTrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, age, gender } = req.body;

      if (!name || name.length <= 2) {
        throw new ApiErrors("Name must be over 2 symbol", 401);
      }
      if (!age || +age <= 0) {
        throw new ApiErrors("Age must be not lower 0", 401);
      }
      if (!gender || (gender !== "male" && gender !== "female")) {
        throw new ApiErrors("Gender must be male or female", 401);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
  public async updateAndTrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = req.body;
      const { name, age, gender } = user;
      const users = await userService.getAll();

      if (name.length <= 2) {
        throw new ApiErrors("Name must be over 2 symbol", 401);
      }
      if (+age <= 0) {
        throw new ApiErrors("Age must be not lower 0", 401);
      }
      if (gender !== "male" && gender !== "female") {
        throw new ApiErrors("Gender must be male or female", 401);
      }

      const userForUpdate = users.find((user) => user.id === +userId);

      if (!userForUpdate) {
        throw new ApiErrors("User not found", 404);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
