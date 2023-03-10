import { Request, Response, Router } from "express";

import { userController } from "../controllers/user.controller";
import { User } from "../models/User.model";
import { IUser } from "../types/user.types";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.get(
  "/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    return res.json(user);
  }
);

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).json({
    message: "User created!",
    data: user,
  });
});

router.put("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = req.body;

  const updatedUser = await User.updateOne({ _id: userId }, user);

  res.status(200).json({
    message: "User updated",
    data: updatedUser,
  });
});

router.delete("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  await User.deleteOne({ _id: userId });

  res.status(200).json({
    message: "User deleted",
  });
});
