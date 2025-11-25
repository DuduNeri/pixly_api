import User from "../models/user.model";
import { ICreateUser, IUserResponse } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

export class userServices {
  async create(data: ICreateUser): Promise<IUserResponse> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) throw new Error("Esse email já está em uso!");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const { password, ...safeUser } = newUser.toJSON();
    return safeUser as IUserResponse;
  }
}
