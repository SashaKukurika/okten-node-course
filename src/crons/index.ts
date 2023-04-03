import { removeOldPasswords } from "./remove.old.password.cron";
import { removeOldTokens } from "./remove.old.tokens.cron";
import { sendEmailToUnvisitedUsers } from "./send.email.to.unvisited.users.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
  sendEmailToUnvisitedUsers.start();
};
