import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
    constructor(public name: string, public email: string, public password: string) {
    }

    static create({ name, email, password }: { [key: string]: any }): [string?, RegisterUserDto?] {
        if (!name) return ['Missing name', undefined];

        if (!email) return ['Missing email', undefined];

        if (!regularExps.email.test(email)) return ['Email is not valid', undefined];

        if (!password) return ['Missing password', undefined];

        if (password.length < 6) return ['Password too short', undefined];

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}