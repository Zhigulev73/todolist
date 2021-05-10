import axios from "axios";
import { TaskType } from "../components/Task/task";
import {
  CategoryDataType,
  CategoryType,
  NewCategoryParamsType,
  NewTaskParamsType,
  ParamsType, UpdateCategoryParamsType,
  UpdateDoneType,
  UpdateFavoriteParamsType,
  UpdateTaskParamsType,
} from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL,
});

const limit = process.env.REACT_APP_TASKS_LIMIT;

export type Colors = "yellowgreen" | "yellow" | "black" | "";
export type Icons = "anchor" | "home" | "thumb_up" | "";

export const API = {
  getTasks: (Params: ParamsType) =>
    instance
      .get<Array<TaskType>>(
        `tasks?${Params.searchString}&isDone=${Params.isListDone}&_start=0&_end=${Params.end}&_limit=${limit}`
      )
      .then((response) => response.data),

  deleteTask(id: number) {
    return instance.delete(`/tasks/${id}`);
  },

  addTask: (NewTaskParams: NewTaskParamsType) =>
    instance.post<TaskType>(`/tasks/`, NewTaskParams),

  updateTaskText: (updateTaskParams: UpdateTaskParamsType) =>
    instance.patch<CategoryType>(`/tasks/${updateTaskParams.id}`, {
      title: updateTaskParams.title,
    }),

  updateDoneHandler: (updateDone: UpdateDoneType) =>
    instance.patch<CategoryType>(`/tasks/${updateDone.id}`, {
      isDone: updateDone.isDone,
    }),

  updateFavoriteHandler: (updateFavoriteParams: UpdateFavoriteParamsType) =>
    instance.patch<CategoryType>(`/tasks/${updateFavoriteParams.id}`, {
      isFavorite: updateFavoriteParams.isFavorite,
    }),

  getCategories: () =>
    instance
      .get<Array<CategoryType>>("/categories")
      .then((response) => response.data),

  getDefaultCategory: () =>
    instance
      .get<CategoryDataType>("/defaultCategory")
      .then((response) => response.data.id),

  deleteCategory: (id: number) => instance.delete(`/categories/${id}`),

  updateDefaultCategory: (id: number | undefined) =>
    instance.put<CategoryType>(`/defaultCategory`, {
      id,
    }),
  updateCategoryIcon: (UpdateCategoryParams: UpdateCategoryParamsType) =>
      instance.patch<CategoryType>(`/categories/${UpdateCategoryParams.id}`, {
        icon: UpdateCategoryParams.icon,
      }),

  addCategory: (newCategoryParams: NewCategoryParamsType) =>
    instance.post<CategoryType>("/categories", newCategoryParams),
};
