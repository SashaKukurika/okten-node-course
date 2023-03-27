import { EEmailAction } from "../enums/email.enums";

export const allTemplates = {
  [EEmailAction.WELCOME]: {
    subject: "Great to see you in our app",
    templateName: "register",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    subject:
      "We control your password, just follow all steps and everything will be great",
    templateName: "forgotPassword",
  },
};
