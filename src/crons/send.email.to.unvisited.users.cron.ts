import { CronJob } from "cron";
import dayjs from "dayjs";
import uts from "dayjs/plugin/utc";

import { EEmailAction } from "../enums";
import { Token, User } from "../models";
import { emailService } from "../services";

dayjs.extend(uts);

const emailToUnvisitedUsers = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");

  const unvisitedUsers = await Token.find({
    createdAt: { $lte: previousMonth },
  });
  const ids = unvisitedUsers.map((record) => record._user_id);

  const users = await User.find({ _id: { $in: ids } });
  const emails = users.map((u) => u.email);

  await emailService.sendMail(emails, EEmailAction.REMINDER);

  // another variant
  // await Promise.all(
  //   users.map(async ({ email }) => {
  //     return emailService.sendMail(email, EEmailAction.REMINDER);
  //   })
  // );
};

export const sendEmailToUnvisitedUsers = new CronJob(
  "0 0 * * *",
  emailToUnvisitedUsers
);
