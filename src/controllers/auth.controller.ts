import User from "../models/user.model";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService: AuthService;
    constructor(){
        this.authService = new AuthService()
    }

    async loginController(email: string, password: string){
       try {
        return this.authService.login(email, password)
       } catch (error: any) {
         throw new Error(`Erro no controller de login: ${error.message}`);
       }
    }
}