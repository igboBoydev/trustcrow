export interface UpdateSubtreeData {
  parent_node: number;
  new_parent_node: number;
  subtree_id: number;
}

export interface CreateCategoryPayload {
  label: string;
  parentId: string | null;
}

export interface RemoveCategory {
  category_id: number;
}

export interface getCategorySubtree {
  parent_node: number;
}
