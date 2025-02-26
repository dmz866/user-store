import { Request, Response } from "express";

export class AuthController {

    register(req: Request, res: Response) {
        res.json('registerUser');
    }

    login(req: Request, res: Response) {
        res.json('registerUser');
    }

    validateEmail(req: Request, res: Response) {
        res.json('registerUser');
    }
}