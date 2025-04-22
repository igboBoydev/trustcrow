import { CreateCategoryPayload, UpdateSubtreeData } from "../utils/interface";
import { BaseController } from "../config/helpers";
import logger from "../utils/logger";
import { Category } from "../models/categoriesModel";

export class CategoryService extends BaseController {
  // private _publicService = new PublicService();

  public addCategory = async (data: CreateCategoryPayload) => {
    let checkLabel = await Category.findOne({ where: { label: data.label } });

    if (checkLabel) {
      return {
        data: [],
        statusCode: 409,
        message: "category with label already exists",
        status: false,
      };
    }

    if (data.parentId) {
      logger.info(typeof data.parentId);
      let checkForParentNode = await Category.findOne({
        where: { id: parseInt(data.parentId) },
      });
      logger.warn(data.parentId);
      if (!checkForParentNode) {
        return {
          data: [],
          statusCode: 409,
          message: "parent category with id does not exist",
          status: false,
        };
      }
    }

    let category = await Category.create({
      label: data.label,
      parentId: data.parentId || null,
    });

    return {
      data: category,
      statusCode: 200,
      message: "success",
      status: true,
    };
  };

  public removeCategory = async (category_id: any) => {
    let category = await Category.findByPk(category_id);

    if (!category) {
      // console.log({ category_id, h: "llllllll" });
      return {
        data: [],
        statusCode: 404,
        message: "category with id provided not found",
        status: true,
      };
    }

    await category.destroy();

    return {
      data: [],
      statusCode: 200,
      message: "category removed successfully",
      status: true,
    };
  };

  public getSubtree = async (parent_node: number) => {
    let subtree = await Category.findAll({ where: { parentId: parent_node } });

    return {
      data: subtree,
      statusCode: 200,
      message: "success",
      status: true,
    };
  };

  public updateSubtreeParent = async (data: UpdateSubtreeData) => {
    let subtree = await Category.findOne({
      where: { id: data.subtree_id },
    });

    if (!subtree) {
      return {
        data: [],
        statusCode: 404,
        message: "subtree with id provided not found",
        status: true,
      };
    }

    let parentCategory = await Category.findOne({
      where: { id: data.parent_node },
    });

    if (!parentCategory) {
      return {
        data: [],
        statusCode: 404,
        message: "Category with parent id provided not found",
        status: true,
      };
    }

    let checkForNewSubtreeParent = await Category.findOne({
      where: { id: data.new_parent_node },
    });

    if (!checkForNewSubtreeParent) {
      return {
        data: [],
        statusCode: 404,
        message: "subtree with new parent node provided not found",
        status: true,
      };
    }

    await Category.update(
      { parentId: data.new_parent_node },
      { where: { parentId: data.parent_node, id: data.subtree_id } }
    );

    const updatedCategory = await Category.findOne({
      where: { id: data.subtree_id },
    });

    return {
      data: updatedCategory,
      statusCode: 200,
      message: "success",
      status: true,
    };
  };
}
