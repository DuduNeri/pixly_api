import { ICreateUser, IUser, IUserResponse } from "../interfaces/user.interface";
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

  async getAll(): Promise<IUserResponse[]>{
   try {
    return this.UserServices.getAllUsers()
   } catch (error: any) {
    throw new Error(`Erro ao tentar buscar usuários:${error.message}`);
   }
  }

  async deletUse(id: string): Promise<string>{
    try {
      return this.UserServices.deleteUser(id)
    } catch (error: any) {
      throw new Error(`Erro ao tentar deletar usuário:${error.message}`);
    }
  }
}
