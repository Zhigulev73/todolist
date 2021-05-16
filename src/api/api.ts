import axios from "axios";
import { TaskType } from "../components/Task/task";
import {
    CategoryDataType,
    CategoryType,
    NewCategoryParamsType,
    NewTaskParamsType,
    ParamsType, updateCategoryParamsType, UpdateCategoryParamsType,
    UpdateDoneType,
    UpdateFavoriteParamsType,
    UpdateTaskParamsType, UpdateTaskType,
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
        `tasks?date_gte=${Params.dateFrom}&date_lte=${Params.dateTo}&${Params.searchString}&isDone=${Params.isListDone}&_start=0&_end=${Params.end}&_limit=${limit}`
      )
      .then((response) => response.data),

  deleteTask(id: number) {
    return instance.delete(`/tasks/${id}`);
  },

  addTask: (NewTaskParams: NewTaskParamsType) =>
    instance.post<TaskType>(`/tasks/`, NewTaskParams),

  updateTask: (UpdateTaskNewParams: UpdateTaskType) =>
    instance.patch<CategoryType>(`/tasks/${UpdateTaskNewParams.id}`, {
      isFavorite: UpdateTaskNewParams.isFavorite,
      title: UpdateTaskNewParams.title,
      isDone: UpdateTaskNewParams.isDone,
    }),

  updateCategoryText: (updateCategoryParams: updateCategoryParamsType) =>
    instance.patch<CategoryType>(`/categories/${updateCategoryParams.id}`, {
        name: updateCategoryParams.name,
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
    updateCategory: ({id, icon, color}: UpdateCategoryParamsType) =>
      instance.patch<CategoryType>(`/categories/${id}`, {
        icon: icon,
        color: color
      }),

  addCategory: (newCategoryParams: NewCategoryParamsType) =>
    instance.post<CategoryType>("/categories", newCategoryParams),
};
