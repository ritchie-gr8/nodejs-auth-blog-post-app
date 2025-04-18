import { compare, genSalt, hashSync } from "bcrypt";
import { Router } from "express";
import { db } from "../utils/db.js";
import { generateToken } from "../utils/jwt.js";

const authRouter = Router();

// 🐨 Todo: Exercise #1
// ให้สร้าง API เพื่อเอาไว้ Register ตัว User แล้วเก็บข้อมูลไว้ใน Database ตามตารางที่ออกแบบไว้
authRouter.post("/register", async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body;

    const salt = await genSalt(10);
    const hash = hashSync(password, salt);

    const user = {
      username,
      firstName,
      lastName,
      password: hash,
    };

    const collection = db.collection("users");
    await collection.insertOne(user);

    return res.status(201).json({
      message: "User has been created successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// 🐨 Todo: Exercise #3
// ให้สร้าง API เพื่อเอาไว้ Login ตัว User ตามตารางที่ออกแบบไว้
authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const collection = db.collection("users");
    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const jwt = generateToken(user);

    return res.status(200).json({
      message: "Login successfully",
      token: jwt,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
