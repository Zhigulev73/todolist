import { FormAction } from "redux-form/lib/actions";
import { TaskType } from "../components/Task/task";
import { API } from "../api/api";
import { BaseThunkType, InferActionsTypes } from "./store";
import {
  CategoryType,
  NewCategoryParamsType,
  NewTaskParamsType,
  ParamsType, UpdateCategoryParamsType,
  UpdateDoneType,
  UpdateFavoriteParamsType,
  UpdateTaskParamsType,
} from "../types/types";

export const actions = {
  updateNewMessageText: (text: string) =>
    ({ type: "UPDATE_NEW_MESSAGE_TEXT", text } as const),
  updateIsEditStatus: () => ({ type: "UPDATE_IS_EDIT" } as const),
  updateEditTaskText: (text: string) =>
    ({ type: "UPDATE_EDIT_TASK_TEXT", text } as const),
  updateCategoryText: (text: string) =>
    ({ type: "UPDATE_CATEGORY_TEXT", text } as const),
  EditTaskText: (updateTaskParams: UpdateTaskParamsType) =>
    ({ type: "EDIT_TASK_TEXT", updateTaskParams } as const),
  deleteTaskAC: (id: number) => ({ type: "DELETE_TASK", id } as const),
  deleteCategoryAC: (id: number) => ({ type: "DELETE_CATEGORY", id } as const),
  changeTaskStatus: (id: number, isListDone: boolean) =>
    ({ type: "CHANGE_TASK_STATUS", id, isListDone } as const),
  changeFavoriteStatus: (id: number) =>
    ({ type: "CHANGE_FAVORITE_STATUS", id } as const),
  addNewTask: (task: TaskType) => ({ type: "ADD_NEW_TASK", task } as const),
  addNewCategory: (category: CategoryType) =>
    ({ type: "ADD_NEW_CATEGORY", category } as const),
  changeHandler: (id: number) => ({ type: "CHANGE_HANDLER", id } as const),
  setTasks: (tasks: Array<TaskType>) => ({ type: "SET_TASKS", tasks } as const),
  setUnicCategories: (categories: Array<CategoryType>) =>
    ({ type: "SET_UNIC_CATEGORIES", categories } as const),
  setCategory: (id: number) =>
    ({ type: "SET_CATEGORY", id } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
};

export const getTasks = (Params: ParamsType): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const response = await API.getTasks(Params);
  dispatch(actions.setTasks(response));
  dispatch(actions.toggleIsFetching(false));
};
export const getNewTasks = (Params: ParamsType): ThunkType => async (dispatch) => {
  const response = await API.getTasks(Params);
  dispatch(actions.setTasks(response));
};
export const getCategories = (): ThunkType => async (dispatch) => {
  const response = await API.getCategories();
  dispatch(actions.setUnicCategories(response));
};
export const getDefaultCategory = (): ThunkType => async (dispatch) => {
  const response = await API.getDefaultCategory();
  dispatch(actions.setCategory(response));
};
export const updateDefaultCategory = (
  id: number
): ThunkType => async (dispatch) => {
  await API.updateDefaultCategory(id);
  dispatch(actions.setCategory(id));
};
export const deleteTask = (id: number): ThunkType => async (dispatch) => {
  await API.deleteTask(id);
  dispatch(actions.deleteTaskAC(id));
};
export const deleteCategory = (id: number): ThunkType => async (dispatch) => {
  await API.deleteCategory(id);
  dispatch(actions.deleteCategoryAC(id));
};
export const addTask = (NewTaskParams: NewTaskParamsType): ThunkType => async (
  dispatch
) => {
  const response = await API.addTask(NewTaskParams);
  dispatch(actions.addNewTask(response.data));
};
export const addCategory = (
  newCategoryParams: NewCategoryParamsType
): ThunkType => async (dispatch) => {
  const response = await API.addCategory(newCategoryParams);
  dispatch(actions.addNewCategory(response.data));
};
export const updateTaskText = (
  updateTaskParams: UpdateTaskParamsType
): ThunkType => async (dispatch) => {
  await API.updateTaskText(updateTaskParams);
  dispatch(actions.EditTaskText(updateTaskParams));
};
export const updateCategoryIcon = (
    UpdateCategoryParams: UpdateCategoryParamsType
): ThunkType => async (dispatch) => {
  await API.updateCategoryIcon(UpdateCategoryParams);
};

export const updateDoneHandler = (
  updateDone: UpdateDoneType
): ThunkType => async (dispatch) => {
  await API.updateDoneHandler(updateDone);
  dispatch(actions.changeTaskStatus(updateDone.id, updateDone.isListDone));
};
export const updateFavoriteHandler = (
  updateFavoriteParams: UpdateFavoriteParamsType
): ThunkType => async (dispatch) => {
  await API.updateFavoriteHandler(updateFavoriteParams);
  dispatch(actions.changeFavoriteStatus(updateFavoriteParams.id));
};

export type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
