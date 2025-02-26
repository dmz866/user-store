import { BcryptAdapter } from '../../config/bcrypt.adapter';
import { envs } from '../../config/envs';
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data/mongo';
import { CustomError } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { EmailService } from './email.service';

export class AuthService {
    constructor(private readonly emailService: EmailService) {

    }

    async register(registerUserDto: RegisterUserDto) {
        const emailExists = await UserModel.findOne({ email: registerUserDto.email });

        if (emailExists) throw CustomError.badRequest('Email already exists');

        try {
            const user = new UserModel(registerUserDto);
            user.password = BcryptAdapter.hash(user.password);

            await user.save();

            const token = await JwtAdapter.generateToken({ id: user.id });

            if (!token) throw CustomError.internalServer('Error while creating jwt');

            await this.sendEmailValidationLink(user.email, String(token));

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
            const token = await JwtAdapter.generateToken({ id: user.id });

            if (!token) throw CustomError.internalServer('Error while creating jwt');

            return { user: { ...userEntity }, token };
        }
        catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    private async sendEmailValidationLink(email: string, token: string) {
        const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <h1>Validate your email</h1>
            <a href="${link}">Validate email: ${email}</a>
        `;

        const sent = await this.emailService.sendEmail({ to: email, subject: 'Validate email', html });

        if (!sent) throw CustomError.internalServer(`Sent email failed`);

        return true;
    }
}