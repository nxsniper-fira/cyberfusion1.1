import { Router } from "express";
import { TOOL_CONFIG } from "../services/toolConfig";
const router = Router();

// Launch tool (returns link)
router.post("/launch", (req, res) => {
  const { tool } = req.body;
  const config = TOOL_CONFIG[tool];
  if (!config) return res.status(404).json({ error: "Tool not found" });
  // Optionally: start container if not running (docker-compose up -d [tool])
  // For simplicity, always running in this example
  const host = req.headers.host.split(":")[0] || "127.0.0.1";
  return res.json({ link: config.link(host) });
});

export default router;