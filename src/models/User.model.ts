import { model, Schema } from "mongoose";

import { EGenders } from "../enums";
import { EUserStatus } from "../enums/user-status.enum";
import { IUser, IUserModel } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      // index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      required: false,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    status: {
      type: String,
      default: EUserStatus.inactive,
      enum: EUserStatus,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    // statics: {
    //   async findByName(name: string): Promise<IUser[]> {
    //     return User.find({ name });
    //   },
    // },
  }
);

userSchema.virtual("nameWithSurname").get(function () {
  // method for user, user.nameWithSurname
  return `${this.name} Kukurika`;
});

userSchema.methods = {
  // method for user, user.nameWithAge()
  nameWithAge() {
    return `${this.name}, you are ${this.age} years old`;
  },
};

userSchema.statics = {
  // static for User, User.find()
  async findByName(name: string): Promise<IUser[]> {
    return User.find({ name });
  },
};
export const User = model<IUser, IUserModel>("user", userSchema);
