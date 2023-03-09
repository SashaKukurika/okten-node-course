import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    name: "Oleh",
    age: 19,
    gender: "male",
  },
  {
    name: "Anton",
    age: 22,
    gender: "female",
  },
  {
    name: "Anya",
    age: 25,
    gender: "female",
  },
  {
    name: "Elizaveta",
    age: 35,
    gender: "female",
  },
  {
    name: "Cocos",
    age: 70,
    gender: "mixed",
  },
];

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.get("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = users[+userId];

  res.json(user);
});

app.post("/users", (req: Request, res: Response) => {
  const body = req.body;
  users.push(body);

  res.status(201).json({
    message: "User created!",
  });
});

app.put("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  users[+userId] = req.body;

  res.status(200).json({
    message: "User updated",
    data: users[+userId],
  });
});

app.delete("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  users.splice(+userId, 1);

  res.status(200).json({
    message: "User deleted",
  });
});

app.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME");
});

const PORT = 5100;

app.listen(PORT, () => {
  mongoose.connect("mongodb://0.0.0.0:27017/sept-2022");
  console.log(`Server has started on PORT ${PORT} 🚀🚀🚀`);
});
