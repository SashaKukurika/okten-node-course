import { Types } from "mongoose";

import { ApiErrors } from "../errors";
import { Car } from "../models";
import { ICar } from "../types";

class CarService {
  public async create(
    data: ICar,
    userId: string | Types.ObjectId
  ): Promise<any> {
    try {
      return await Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }
  public async getById(userId: string, carId: string): Promise<ICar> {
    try {
      // return Car.findById(carId).populate("user");
      const result = await Car.aggregate([
        {
          $match: {
            _id: carId,
            user: new Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
          },
        },
      ]);

      return result[0];
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }
}

export const carService = new CarService();
