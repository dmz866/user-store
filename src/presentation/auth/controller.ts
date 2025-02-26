import { Request, Response } from "express";
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthService } from '../services/auth.service';

export class AuthController {
    constructor(readonly authService:AuthService){}

    async register(req: Request, res: Response) {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({ error });

        await this.authService.register(registerUserDto!);

        res.json();
    }

    login(req: Request, res: Response) {
        res.json('registerUser');
    }

    validateEmail(req: Request, res: Response) {
        res.json('registerUser');
    }
}