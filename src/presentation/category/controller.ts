import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CategoryService } from '../services/category.service';

export class CategoryController {
    constructor(readonly categoryService: CategoryService) {
    }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }

    createCategory = async (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

        if (error) return res.status(400).json({ error });

        await this.categoryService.createCategory(createCategoryDto!)
            .then((category) => res.status(201).json(category))
            .catch((error) => this.handleError(error, res));
    }
}