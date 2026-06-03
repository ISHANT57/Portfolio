import { Router } from "express";
import { db } from "../lib/db";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    await db.execute(
      `
      INSERT INTO contacts(name,email,message)
      VALUES(?,?,?)
      `,
      [name, email, message],
    );

    return res.json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
