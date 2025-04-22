import {
  CreateCategoryPayload,
  getCategorySubtree,
  RemoveCategory,
  UpdateSubtreeData,
} from "../utils/interface";
import { BaseController } from "../config/helpers";
import logger from "../utils/logger";
import { CategoryService } from "../services/categoryService";

export class CategoryController extends BaseController {
  private _caetegoryService = new CategoryService();

  public addCategory = async (data: CreateCategoryPayload) => {
    let res = await this._caetegoryService.addCategory(data);
    return this.sendData(res.data, res.statusCode, res.message, res.status);
  };

  public removeCategory = async (data: RemoveCategory) => {
    logger.info("0000000000000000000");
    let res = await this._caetegoryService.removeCategory(data.category_id);
    logger.info("kkksk");
    return this.sendData(res.data, res.statusCode, res.message, res.status);
  };

  public getSubtree = async (data: getCategorySubtree) => {
    let res = await this._caetegoryService.getSubtree(data.parent_node);
    return this.sendData(res.data, res.statusCode, res.message, res.status);
  };

  public updateSubtreeParent = async (data: UpdateSubtreeData) => {
    let res = await this._caetegoryService.updateSubtreeParent(data);
    return this.sendData(res.data, res.statusCode, res.message, res.status);
  };
}
