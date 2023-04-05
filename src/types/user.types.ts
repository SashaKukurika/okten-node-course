import { Model } from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password: string;
  gender: string;
  age: number;
  avatar?: string;
  phone?: string;
}

export interface IUserMethods {
  nameWithAge(): void;
}

export interface IUserVirtuals {
  nameWithSurname: string;
}

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  findByName(name: string): Promise<IUser[]>;
}
