import { TaskType } from "../../components/Task/task";
import { ActionsType } from "../actions";
import { CategoryType } from "../../types/types";

interface InitialStateType {
  tasks: Array<TaskType>;
  newTaskText: string;
  ChangedTaskText: string;
  editItem: boolean;
  isFetching: boolean;
  categories: Array<CategoryType>;
  categoryId: number | null
  categoriesName: string;
  endNumber: number;
  isEditStatus: boolean;
}

const initialState: InitialStateType = {
  tasks: [],
  newTaskText: "",
  ChangedTaskText: "",
  editItem: false,
  isFetching: false,
  categories: [],
  categoryId: null,
  categoriesName: "",
  endNumber: 8,
  isEditStatus: false,
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
    case "UPDATE_IS_EDIT": {
      return {
        ...state,
        isEditStatus: !state.isEditStatus,
      };
    }
    case "UPDATE_EDIT_TASK_TEXT": {
      return {
        ...state,
        ChangedTaskText: action.text,
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
        tasks: [...state.tasks, action.task],
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
        tasks: [...state.tasks.filter((task) => task.id !== action.id)],
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
        tasks: action.tasks,
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
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, isDone: !task.isDone } : task
        ).filter(task => task.isDone === action.isListDone),
      };
    }
    case "CHANGE_FAVORITE_STATUS": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, isFavorite: !task.isFavorite }
            : task
        ).sort((a) => a.isFavorite ? -1 : 1),
      };
    }
    case "EDIT_TASK_TEXT": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
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
    case "CHANGE_HANDLER": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, isEdit: !task.isEdit } : task
        ),
        // @ts-ignore
        ChangedTaskText: state.tasks.find((task) => task.id === action.id)
          .title,
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
