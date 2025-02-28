import { CategoryModel } from "../../data/mongo/models/category.model";
import { CustomError } from "../../domain";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class CategoryService {
    constructor() {
    }

    async createCategory(createCategoryDto: CreateCategoryDto) {
        try {
            const category = new CategoryModel(createCategoryDto);
            await category.save();

            return CategoryEntity.fromObject(category);
        }
        catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getCategories() {
        const categories = await CategoryModel.find();

        return categories.map(CategoryEntity.fromObject);
    }
}