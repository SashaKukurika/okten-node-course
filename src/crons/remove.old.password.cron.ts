import { CronJob } from "cron";
import dayjs from "dayjs";
import uts from "dayjs/plugin/utc";

import { OldPassword } from "../models";

dayjs.extend(uts);

const oldPasswordsRemover = async (): Promise<void> => {
  const previousYear = dayjs().utc().subtract(1, "year");

  await OldPassword.deleteMany({ createdAt: { $lte: previousYear } });
};

export const removeOldPasswords = new CronJob("0 0 * * *", oldPasswordsRemover);
