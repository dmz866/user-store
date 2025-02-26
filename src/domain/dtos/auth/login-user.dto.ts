
export class LoginUserDto {
    constructor(public email: string, public password: string) {
    }

    static create({ email, password }: { [key: string]: any }): [string?, LoginUserDto?] {
        if (!email) return ['Missing email', undefined];

        if (!password) return ['Missing password', undefined];


        return [undefined, new LoginUserDto(email, password)];
    }
}