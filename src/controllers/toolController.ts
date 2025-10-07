import { Request, Response, NextFunction } from "express";
import { toolService } from "../services/toolService";
import Joi from "joi";

// Validation schemas
const toolSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(1000).allow(""),
  team: Joi.string().valid("white_hat", "red_team", "blue_team", "gray_team", "black_hat").required(),
  category: Joi.string().max(50).required(),
  default_parameters: Joi.object().default({}),
  requires_scope: Joi.boolean().default(true),
  ui_schema: Joi.object().default({}),
  icon: Joi.string().max(100).allow("")
});

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(20),
  team: Joi.string().valid("white_hat", "red_team", "blue_team", "gray_team", "black_hat"),
  category: Joi.string().max(50),
  search: Joi.string().max(100)
});

export const toolController = {
  /**
   * @swagger
   * /api/v1/tools:
   *   get:
   *     summary: Get all tools (paginated, filterable)
   *     tags: [Tools]
   */
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = querySchema.validate(req.query);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const result = await toolService.listTools(value);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tools:
   *   post:
   *     summary: Add a new tool
   *     tags: [Tools]
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = toolSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      // RBAC: Only admins can add
      if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });

      const tool = await toolService.createTool(value);
      res.status(201).json(tool);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tools/{id}:
   *   put:
   *     summary: Update a tool
   *     tags: [Tools]
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, error } = toolSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });

      const tool = await toolService.updateTool(req.params.id, value);
      if (!tool) return res.status(404).json({ error: "Tool not found" });
      res.json(tool);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tools/{id}:
   *   delete:
   *     summary: Delete a tool
   *     tags: [Tools]
   */
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });
      const deleted = await toolService.deleteTool(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Tool not found" });
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
};