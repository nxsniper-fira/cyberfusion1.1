import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ error: "No token" });

  jwt.verify(token, process.env.JWT_SECRET || "changeme", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    // @ts-ignore
    req.user = user;
    next();
  });
}