import { Router } from "express";
import { pool } from "../db";

const router = Router();

// List assets
router.get("/", async (req, res) => {
  const assets = await pool.query("SELECT * FROM assets ORDER BY discovered_at DESC LIMIT 100");
  res.json(assets.rows);
});

// Add asset
router.post("/", async (req, res) => {
  const { ip_address, hostname, os } = req.body;
  const resp = await pool.query(
    "INSERT INTO assets (ip_address, hostname, os) VALUES ($1, $2, $3) RETURNING *",
    [ip_address, hostname, os]
  );
  res.json(resp.rows[0]);
});

export default router;