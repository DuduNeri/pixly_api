import { Request } from "express";

export interface JwtPayload {
  id: string;
  email: string;
  role?: string;
  name: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
