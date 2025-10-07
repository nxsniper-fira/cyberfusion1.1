import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/", async (req, res) => {
  const logs = await pool.query(
    "SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 100"
  );
  res.json(logs.rows);
});

export default router;