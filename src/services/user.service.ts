import { ApiErrors } from "../errors";
import { User } from "../models";
import { IPaginationResponse, IQuery, IUser } from "../types";

class UserService {
  // public async getAll(): Promise<IUser[]> {
  //   try {
  //     return User.find();
  //   } catch (e) {
  //     throw new ApiErrors(e.message, e.status);
  //   }
  // }

  public async getWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (mathc) => `$${mathc}`)
      );

      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;
      const skip = limit * (page - 1);

      const users = await User.find(searchObject)
        .skip(skip)
        .limit(limit)
        .sort(sortedBy)
        .lean();

      const usersTotalCount = await User.count();

      return {
        page: +page,
        perPage: +limit,
        itemsCount: usersTotalCount,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }
  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiErrors(e.message, e.status);
    }
  }
}

export const userService = new UserService();
