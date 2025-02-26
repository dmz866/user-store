import { Request, Response } from "express";
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthService } from '../services/auth.service';

export class AuthController {
    constructor(readonly authService: AuthService) {
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
        const result = await this.authService.register(registerUserDto!);

        res.json(result);
    }

    login(req: Request, res: Response) {
        res.json('registerUser');
    }

    validateEmail(req: Request, res: Response) {
        res.json('registerUser');
    }
}