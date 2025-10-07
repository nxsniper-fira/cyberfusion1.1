import { Router } from "express";
import { exec } from "child_process";
import { TOOL_CONFIG } from "../services/toolConfig";
const router = Router();

router.post("/start", (req, res) => {
  const { tool } = req.body;
  if (!TOOL_CONFIG[tool]) return res.status(404).json({ error: "Tool not found" });
  exec(`docker-compose up -d ${tool}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: "Started" });
  });
});

router.post("/stop", (req, res) => {
  const { tool } = req.body;
  if (!TOOL_CONFIG[tool]) return res.status(404).json({ error: "Tool not found" });
  exec(`docker-compose stop ${tool}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ message: "Stopped" });
  });
});

router.get("/logs/:tool", (req, res) => {
  const tool = req.params.tool;
  if (!TOOL_CONFIG[tool]) return res.status(404).json({ error: "Tool not found" });
  exec(`docker-compose logs --tail=100 ${tool}`, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ logs: stdout });
  });
});

export default router;