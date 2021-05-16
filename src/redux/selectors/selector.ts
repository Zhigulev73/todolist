import { AppStateType } from "../store";

export const getTasksFromState = (state: AppStateType) => state.doneTasks;
export const getDoneTasksFromState = (state: AppStateType) => state.unDoneTasks;

export const getNewTaskText = (state: AppStateType) => state.newTaskText;

export const getChangedTaskText = (state: AppStateType) => state.ChangedTaskText;
export const getChangedCategoryText = (state: AppStateType) => state.ChangedCategoryText;
export const getIsFetching = (state: AppStateType) => state.isFetching;
export const getCategoriesFromState = (state: AppStateType) => state.categories;
export const selectDefaultCategoryId = (state: AppStateType) => state.categoryId;
export const getCategoriesName = (state: AppStateType) => state.categoriesName;
export const getEndNumber = (state: AppStateType) => state.endNumber;
