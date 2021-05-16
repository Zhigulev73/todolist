import { TaskType } from "../../components/Task/task";
import { ActionsType } from "../actions";
import { CategoryType } from "../../types/types";

interface InitialStateType {
  doneTasks: Array<TaskType>;
  unDoneTasks: Array<TaskType>;
  newTaskText: string;
  ChangedTaskText: string;
  ChangedCategoryText: string;
  editItem: boolean;
  isFetching: boolean;
  categories: Array<CategoryType>;
  categoryId: number | null
  categoriesName: string;
  endNumber: number;
}

const initialState: InitialStateType = {
  doneTasks: [],
  unDoneTasks: [],
  newTaskText: "",
  ChangedTaskText: "",
  ChangedCategoryText: "",
  editItem: false,
  isFetching: false,
  categories: [],
  categoryId: null,
  categoriesName: "",
  endNumber: 8,
};

const reducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "UPDATE_NEW_MESSAGE_TEXT": {
      return {
        ...state,
        newTaskText: action.text,
      };
    }
    case "UPDATE_EDIT_TASK_TEXT": {
      return {
        ...state,
        ChangedTaskText: action.text,
      };
    }
    case "UPDATE_EDIT_CATEGORY_TEXT": {
      return {
        ...state,
        ChangedCategoryText: action.text,
      };
    }
    case "UPDATE_CATEGORY_TEXT": {
      return {
        ...state,
        categoriesName: action.text,
      };
    }
    case "ADD_NEW_TASK": {
      return {
        ...state,
        unDoneTasks: [...state.unDoneTasks, action.task],
        newTaskText: "",
      };
    }
    case "ADD_NEW_CATEGORY": {
      return {
        ...state,
        categories: [...state.categories, action.category],
        categoriesName: "",
      };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        doneTasks: [...state.doneTasks.filter((task) => task.id !== action.id)],
        unDoneTasks: [...state.unDoneTasks.filter((task) => task.id !== action.id)],
      };
    }
    case "DELETE_CATEGORY": {
      return {
        ...state,
        categories: [
          ...state.categories.filter((category) => category.id !== action.id),
        ],
      };
    }
    case "SET_TASKS": {
      return {
        ...state,
        doneTasks: action.tasks,
      };
    }
    case "SET_DONE_TASKS": {
      return {
        ...state,
        unDoneTasks: action.tasks,
      };
    }
    case "SET_UNIC_CATEGORIES": {
      return {
        ...state,
        categories: action.categories,
      };
    }
    case "SET_CATEGORY": {
      return {
        ...state,
        categoryId: action.id,
      };
    }
    case "CHANGE_TASK_STATUS": {
      return action.isListDone ? {
        ...state,
        doneTasks: state.doneTasks.map((task) =>
            task.id === action.id ? { ...task, isDone: !task.isDone } : task
        ),
      } : {
        ...state,
        unDoneTasks: state.unDoneTasks.map((task) =>
            task.id === action.id ? { ...task, isDone: !task.isDone } : task
        ),
      }
    }
    case "CHANGE_FAVORITE_STATUS": {
      return {
        ...state,
        doneTasks: state.doneTasks.map((task) =>
          task.id === action.id
            ? { ...task, isFavorite: !task.isFavorite }
            : task
        ),
        unDoneTasks: state.unDoneTasks.map((task) =>
          task.id === action.id
            ? { ...task, isFavorite: !task.isFavorite }
            : task
        ),
      };
    }
    case "EDIT_CATEGORY_ICON": {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.UpdateCategoryParams.id
            ? { ...category, icon: action.UpdateCategoryParams.icon, color: action.UpdateCategoryParams.color }
            : category
        ),
      };
    }
    case "EDIT_TASK_TEXT": {
      return {
        ...state,
        unDoneTasks: state.unDoneTasks.map((task) =>
          task.id === action.updateTaskParams.id
            ? {
                ...task,
                title: action.updateTaskParams.title,
                isEdit: !task.isEdit,
              }
            : task
        ),
      };
    }
    case "EDIT_CATEGORY_TEXT": {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.updateCategoryParams.id
            ? {
                ...category,
                name: action.updateCategoryParams.name,
                isEdit: !category.isEdit,
              }
            : category
        ),
      };
    }
    case "CHANGE_HANDLER": {
      return {
        ...state,
        unDoneTasks: state.unDoneTasks.map((task) =>
          task.id === action.id ? { ...task, isEdit: !task.isEdit } : { ...task, isEdit: false }
        ),
        // @ts-ignore
        ChangedTaskText: state.unDoneTasks.find((task) => task.id === action.id)
          .title,
      };
    }
    case "CHANGE_CATEGORY_HANDLER": {
      return {
        ...state,
        categories: state.categories.map((category) =>
            category.id === action.id ? { ...category, isEdit: !category.isEdit } : { ...category, isEdit: false }
        ),
        // @ts-ignore
        ChangedCategoryText: state.categories.find((categories) => categories.id === action.id)
          .name,
      };
    }
    case "TOGGLE_IS_FETCHING": {
      return { ...state, isFetching: action.isFetching };
    }
    default:
      return state;
  }
};

export default reducer;
