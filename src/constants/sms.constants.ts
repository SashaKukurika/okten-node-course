import { ESmsActionEnum } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsActionEnum.WELCOME]:
    "Great to see you in our app! We wont to by Citroen DS4",

  [ESmsActionEnum.FORGOT_PASSWORD]:
    "We control your password, just follow all steps and everything will be good",
};
