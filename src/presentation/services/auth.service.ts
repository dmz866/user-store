import { BcryptAdapter } from '../../config/bcrypt.adapter';
import { UserModel } from '../../data/mongo';
import { CustomError } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';

export class AuthService {
    async register(registerUserDto: RegisterUserDto) {
        const emailExists = await UserModel.findOne({ email: registerUserDto.email });

        if (emailExists) throw CustomError.badRequest('Email already exists');

        try {
            const user = new UserModel(registerUserDto);
            user.password = BcryptAdapter.hash(user.password);

            await user.save();
            const { password, ...userEntity } = UserEntity.fromObject(user);

            return { user: { ...userEntity }, token: 'Test token' };
        }
        catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async login(loginUserDto: LoginUserDto) {
        try {
            const userModel = await UserModel.findOne({ email: loginUserDto.email });

            if (!userModel) throw CustomError.badRequest('Invalid credentials');

            if (!BcryptAdapter.compare(loginUserDto.password, userModel.password)) throw CustomError.badRequest('Invalid credentials');

            const user = new UserModel(userModel);
            const { password, ...userEntity } = UserEntity.fromObject(user);

            return { user: { ...userEntity }, token: 'Test token' };
        }
        catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}