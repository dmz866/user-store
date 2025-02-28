import { Router } from 'express';
import { CategoryService } from '../services/category.service';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();
        const categoryService = new CategoryService();
        const controller = new CategoryController(categoryService);

        router.post('/', [AuthMiddleware.validateJWT], controller.createCategory);
        //router.get('/categories', controller.getCategories);

        return router;
    }


}

