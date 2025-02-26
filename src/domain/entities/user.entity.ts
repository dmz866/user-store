import { CustomError } from "../errors/custom.error";

export class UserEntity {
    constructor(id: string, name: string, email: string, emailValidated: boolean, password: string, role: string[], img?: string) {
    }

    fromObject({ id, _id, name, email, emailValidated, password, role, img }: { [key: string]: any }) {
        if (!id && !_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!name) {
            throw CustomError.badRequest('Missing name');
        }

        if (!email) {
            throw CustomError.badRequest('Missing email');
        }

        if (emailValidated === undefined) {
            throw CustomError.badRequest('Missing emailValidated');
        }

        if (!password) {
            throw CustomError.badRequest('Missing password');
        }

        if (!role) {
            throw CustomError.badRequest('Missing role');
        }

        return new UserEntity(_id || id, name, email, emailValidated, password, role, img);
    }
}