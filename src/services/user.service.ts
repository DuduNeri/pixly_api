import User from "../models/user.model";
import { ICreateUser, IUserResponse } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";

export class userServices {
  async create(data: ICreateUser): Promise<IUserResponse> {
    if (!data.name || !data.email || !data.password) {
      throw new AppError(400, "Todos os campos são obrigatórios");
    }

    const existing = await User.findOne({ where: { email: data.email } });

    if (existing) {
      throw new AppError(409, "Esse email já está em uso");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const { password, ...safeUser } = newUser.toJSON();
    return safeUser as IUserResponse;
  }

  async getUser(id: string): Promise<IUserResponse> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError(400, "Usuário não encontrado");
    }
    const userJson = user.toJSON();
    const { password, ...userWithoutPassword } = userJson;
    return userWithoutPassword as IUserResponse;
  }
}
