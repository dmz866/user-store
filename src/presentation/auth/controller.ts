import { Request, Response } from "express";
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthService } from '../services/auth.service';
import { CustomError } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
    constructor(readonly authService: AuthService) {
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    /**
     public async register(req: Request, res: Response) {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({ error });
        const result = await this.authService.register(registerUserDto!);

        res.json(result);
    }
     */

    register = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        await this.authService.register(registerUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    }

    login = async (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        await this.authService.login(loginUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    }

    validateEmail(req: Request, res: Response) {
        res.json('registerUser');
    }
}