import { IUser } from "./../interfaces/user.interface";
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
      throw new AppError(404, "Usuário não encontrado");
    }

    const userJson = user.toJSON();
    const { password, ...userWithoutPassword } = userJson;
    return userWithoutPassword as IUserResponse;
  }

  async getAllUsers(): Promise<IUserResponse[]> {
    const users = await User.findAll({
      attributes: { exclude: [`password`] },
    });

    return users.map((user) => user.toJSON() as IUserResponse);
  }

  async deleteUser(id: string): Promise<string> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError(404, "Usuário não encontrado para exclusão");
    }

    await user.destroy();
    return "Usuário deletado com sucesso";
  }

  async updateUser(id: string, data: IUser): Promise<IUserResponse> {
    const user = await User.findByPk(id);

    if (!user) {
      throw new AppError(400, "Erro ao buscar usuário");
    }

    let updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await user.update(updateData);

    const { password, ...safeUser } = user.toJSON();
    return safeUser as IUserResponse;
  }
}
