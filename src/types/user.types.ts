export enum EGenders {
  // eslint-disable-next-line no-unused-vars
  male = "male",
  // eslint-disable-next-line no-unused-vars
  female = "female",
  // eslint-disable-next-line no-unused-vars
  mixed = "mixed",
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  gender: string;
  age: number;
}
