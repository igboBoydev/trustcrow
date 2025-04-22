import { Router, Request, Response, NextFunction } from "express";
import { CategoryController } from "../controllers/categoryController";
import { controllerHandler } from "../config/controllerHandler";

// import { AccountController } from "../../../api/Account/accountController";

const categoryRoute = Router();
const call = controllerHandler;
const _categoryController = new CategoryController();

categoryRoute.post(
  "/add-category",
  call(
    _categoryController.addCategory,
    (req: Request, res: Response, next: NextFunction) => [req.body]
  )
);

categoryRoute.delete(
  "/delete-category",
  call(
    _categoryController.removeCategory,
    (req: Request, res: Response, next: NextFunction) => [req.query]
  )
);

categoryRoute.get(
  "/get-category-subtree",
  call(
    _categoryController.getSubtree,
    (req: Request, res: Response, next: NextFunction) => [req.query]
  )
);

categoryRoute.put(
  "/update-category-subtree",
  call(
    _categoryController.updateSubtreeParent,
    (req: Request, res: Response, next: NextFunction) => [req.query]
  )
);

export default categoryRoute;
