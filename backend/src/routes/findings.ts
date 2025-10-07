import { Router } from "express";
const router = Router();

router.post("/import/nessus", (req, res) => {
  // TODO: Implement Nessus import
  res.json({ success: true });
});

export default router;