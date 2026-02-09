import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function authMidleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token inválido" });
  }

try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET || "secret"
  ) as {
    id: string;
    email: string;
    name: string;
  }; 

  if (!decoded.id) { 
    return res.status(401).json({ message: "Token inválido: falta ID" });
  }

  req.user = {
    id: decoded.id,
    email: decoded.email || "", 
    name: decoded.name || "",
  };

  next();
} catch (error) {
  return res.status(401).json({ message: "Token inválido ou expirado" });
}
}
