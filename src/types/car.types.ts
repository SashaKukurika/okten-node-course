import { Types } from "mongoose";

import { IUser } from "./user.types";

export interface ICar {
  _id?: Types.ObjectId;
  model: string;
  brand: string;
  year: number;
  user: IUser | Types.ObjectId;
}
