import { Router } from "express";

const authRouter = Router();

// 🐨 Todo: Exercise #1
// ให้สร้าง API เพื่อเอาไว้ Register ตัว User แล้วเก็บข้อมูลไว้ใน Database ตามตารางที่ออกแบบไว้
authRouter.post("/resgister", async (req, res) => {
    const user ={
            "username": req.body.username,
            "password": req.body.password,
            "firstName": req.body.firstname,
            "lastName": req.body.lastname, 
    };

    const salt = await brcrypt.genSalt(10);
    user.password = await brcrypt.hash(user.password, salt);

    const collection = db.collection("users");
    await collection.insertOne(user);

    return res.json({
        message: "User has been created successfully",
    });
})
// 🐨 Todo: Exercise #3
// ให้สร้าง API เพื่อเอาไว้ Login ตัว User ตามตารางที่ออกแบบไว้

export default authRouter;
