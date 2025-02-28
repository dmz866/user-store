
export class CreateCategoryDto {
    constructor(public name: string, public available: boolean) {
    }

    static create({ name, password }: { [key: string]: any }): [string?, CreateCategoryDto?] {
        if (!name) return ['Missing name', undefined];

        return [undefined, new CreateCategoryDto(name, password)];
    }
}