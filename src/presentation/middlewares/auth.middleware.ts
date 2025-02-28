import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const auth = req.header('Authorization');

        if (!auth) return res.status(401).json({ error: 'No token provided' });

        if (!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid token' });

        const token = auth.split(' ').at(1);

        if (!token) return res.status(401).json({ error: 'No token provided' });

        try {
            const payload: any = await JwtAdapter.validateToken<{ id: string, email: string }>(token!);

            if (!payload) return res.status(401).json({ error: 'Invalid payload' });

            const user = UserModel.findById({ id: payload.id })

            if (!user) return res.status(401).json({ error: 'Invalid user id' });

            req.body.user = UserEntity.fromObject(user);
            next();
        }
        catch (error) {
            return res.status(500).json({ error: 'internal server error' });
        }
    }
}