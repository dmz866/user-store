import { UserModel } from '../../data/mongo';
import { CustomError } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';

export class AuthService {
    async register(registerUserDto: RegisterUserDto) {
        const emailExists = await UserModel.findOne({ email: registerUserDto.email });

        if (emailExists) throw CustomError.badRequest('Email already exists');
    }
}