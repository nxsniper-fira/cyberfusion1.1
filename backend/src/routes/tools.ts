import { Router } from "express";
import { pool } from "../db";
import { requireRole } from "../middleware/rbac";

const router = Router();

router.post("/execute", requireRole("admin", "operator", "team_lead"), async (req, res) => {
  const { toolId, parameters } = req.body;
  // Validate toolId and parameters (optional: check against tool's ui_schema)
  const tool = await pool.query("SELECT * FROM tools WHERE id=$1", [toolId]);
  if (!tool.rows.length) return res.status(404).json({ error: "Tool not found" });
  const job = await pool.query(
    "INSERT INTO tool_jobs (tool_id, parameters, status, created_at) VALUES ($1, $2, 'queued', NOW()) RETURNING id",
    [toolId, parameters]
  );
  res.json({ jobId: job.rows[0].id, status: "queued" });
});

router.get("/jobs/:id/output", async (req, res) => {
  const job = await pool.query("SELECT * FROM tool_jobs WHERE id=$1", [req.params.id]);
  if (!job.rows.length) return res.status(404).json({ error: "Job not found" });
  res.json({ status: job.rows[0].status, output: job.rows[0].output });
});

export default router;