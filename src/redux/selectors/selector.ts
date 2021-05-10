import { AppStateType } from "../store";

export const getTasksFromState = (state: AppStateType) => state.tasks;

export const getNewTaskText = (state: AppStateType) => state.newTaskText;

export const getChangedTaskText = (state: AppStateType) =>
  state.ChangedTaskText;
export const getIsFetching = (state: AppStateType) => state.isFetching;
export const getCategoriesFromState = (state: AppStateType) => state.categories;
export const selectDefaultCategoryId = (state: AppStateType) => state.categoryId;
export const getCategoriesName = (state: AppStateType) => state.categoriesName;
export const getEndNumber = (state: AppStateType) => state.endNumber;
export const getIsEditStatus = (state: AppStateType) => state.isEditStatus;
