import { EEmailAction } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailAction.WELCOME]: {
    subject: "Great to see you in our app",
    templateName: "register",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    subject:
      "We control your password, just follow all steps and everything will be great",
    templateName: "forgotPassword",
  },
  [EEmailAction.ACTIVE]: {
    subject: "Activate!",
    templateName: "activate",
  },
};
