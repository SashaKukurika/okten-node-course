import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../configs";
import { ApiErrors } from "../errors";

class FileMiddleware {
  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiErrors("No files to upload", 400);
      }

      if (Array.isArray(req.files.avatar)) {
        throw new ApiErrors("You can upload only one photo", 400);
      }

      const { size, mimetype, name } = req.files.avatar;

      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiErrors(`File ${name} is too big.`, 400);
      }
      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiErrors(`File ${name} has invalid format`, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
