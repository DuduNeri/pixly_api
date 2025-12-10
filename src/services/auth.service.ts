import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import dotenv from "dotenv";
import { AppError } from "../utils/appError";

dotenv.config();

export class AuthService {
  async login(email: string, password: string) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError(409, "Credenciais inválidas");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" } 
    );

    return {
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
