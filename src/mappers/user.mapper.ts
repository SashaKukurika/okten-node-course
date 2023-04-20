import { configs } from "../configs";
import { IUser } from "../types";

export class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      age: user.age || null,
      avatar: user.avatar ? `${configs.AWS_S3_URL}/${user.avatar}` : null,
      phone: user.phone,
    };
  }
  public toManyResponse(users: IUser[]) {
    return users.map((item) => this.toResponse(item));
  }
}

export const userMapper = new UserMapper();
