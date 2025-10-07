import { Router } from "express";
import { pool } from "../db";

const router = Router();

// List users (admin only)
router.get("/", async (req, res) => {
  const users = await pool.query("SELECT id, username, role, is_active, created_at FROM users ORDER BY created_at DESC");
  res.json(users.rows);
});

// Set user role (admin only)
router.post("/:userId/role", async (req, res) => {
  const { role } = req.body;
  const { userId } = req.params;
  await pool.query("UPDATE users SET role=$1 WHERE id=$2", [role, userId]);
  res.json({ success: true });
});

export default router;