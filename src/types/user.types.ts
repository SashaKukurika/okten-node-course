export enum EGenders {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  gender: string;
}
