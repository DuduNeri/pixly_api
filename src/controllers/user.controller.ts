import { ICreateUser, IUserResponse } from "../interfaces/user.interface";
import { userServices } from "../services/user.service";

export class userController {
  private UserServices: userServices;

  constructor() {
    this.UserServices = new userServices();
  }

  async createUser(data: ICreateUser): Promise<IUserResponse> {
    try {
      return this.UserServices.create(data);
    } catch (error: any) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async getUse(id: string): Promise<IUserResponse> {
    try {
      return this.UserServices.getUser(id);
    } catch (error: any) {
      throw new Error(`Erro ao buscar usuário:${error.message}`);
    }
  }
}
