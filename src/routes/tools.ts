import { Router } from "express";
import { toolController } from "../controllers/toolController";
import { authenticateToken } from "../middleware/auth";
const router = Router();

router.get("/", authenticateToken, toolController.list);
router.post("/", authenticateToken, toolController.create);
router.put("/:id", authenticateToken, toolController.update);
router.delete("/:id", authenticateToken, toolController.remove);

export default router;