import { ApiErrors } from "../errors/api.errors";
import { User } from "../models/User.model";
import { IUser } from "../types/user.types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
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
