export enum EGenders {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password: string;
  gender: string;
  age: number;
}
