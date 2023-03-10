import express from "express";
import mongoose from "mongoose";

import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

const PORT = 5100;

app.listen(PORT, () => {
  mongoose.connect("mongodb://0.0.0.0:27017/sept-2022");
  console.log(`Server has started on PORT ${PORT} 🚀🚀🚀`);
});
