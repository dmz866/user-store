import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
    constructor(public name: string, public email: string, public password: string) {
    }

    static create({ name, email, password }: { [key: string]: any }) {
        if (!name) return ['Missing name'];

        if (!email) return ['Missing email'];

        if (!regularExps.email.test(email)) return ['Email is not valid', undefined];

        if (!password) return ['Missing password'];

        if (password.length < 6) return ['Password too short'];

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}