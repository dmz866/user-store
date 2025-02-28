import { CustomError } from "../errors/custom.error";

export class CategoryEntity {
    constructor(public id: string, public name: string, public available: boolean) {
    }

    static fromObject({ id, _id, name, available }: { [key: string]: any }) {
        if (!id && !_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!name) {
            throw CustomError.badRequest('Missing name');
        }

        if (available === undefined) {
            throw CustomError.badRequest('Missing emailValidated');
        }

        return new CategoryEntity(_id || id, name, available);
    }
}