import { Colors, Icons } from "../api/api";

export type CategoryTitleType = string | string[] | null | undefined;

export type CategoryType = {
  icon: Icons;
  name: string;
  color: Colors;
  id: number;
};

export type ParamsType = {
  isListDone?: boolean;
  end?: number;
  searchString: string;
};
export type UpdateDoneType = {
  isDone: boolean;
  id: number;
  isListDone: boolean;
};
export type UpdateTaskParamsType = {
  title: string;
  id: number;
};
export type UpdateCategoryParamsType = {
  icon: Icons;
  id: number;
};
export type UpdateFavoriteParamsType = {
  isFavorite: boolean;
  id: number;
};
export type NewTaskParamsType = {
  title: string;
  isDone: boolean;
  isEdit: boolean;
  categoryId: number | null;
  date: string | null;
  isFavorite: boolean;
};
export type NewCategoryParamsType = {
  name: string;
  color: Colors;
  icon: Icons;
};

export type CategoryDataType = {
  id: number;
};
