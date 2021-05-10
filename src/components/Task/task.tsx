import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import classes from "./task.module.scss";
import {
  actions,
  deleteTask,
  updateDoneHandler,
  updateFavoriteHandler,
  updateTaskText,
} from "../../redux/actions";
import {CategoryType, UpdateTaskParamsType} from "../../types/types";
import {
  getChangedTaskText,
  getIsEditStatus,
} from "../../redux/selectors/selector";
import Checkbox from "@material-ui/core/Checkbox";
import {StyledButton, StyledIconButton} from "./taskStyles";

export type TaskType = {
  title: string;
  isDone: boolean;
  isEdit: boolean;
  id: number;
  isFavorite: boolean;
  categoryId: number;
  date: Date | null;
};

type PropsType = {
  task: TaskType;
  categories: CategoryType[];
  isListDone:boolean
};

const Task: React.FC<PropsType> = ({ task, categories,isListDone}) => {
  const dispatch = useDispatch();

  const ChangedTaskText = useSelector(getChangedTaskText);
  const IsEditStatus = useSelector(getIsEditStatus);

  const EditHandleEnter = (
    e: React.KeyboardEvent<HTMLDivElement>,
    updateTaskParams: UpdateTaskParamsType
  ) => {
    if (e.key === "Enter") {
      dispatch(updateTaskText(updateTaskParams));
      dispatch(actions.updateIsEditStatus());
    }
  };

  const updateFavoriteParams = {
    isFavorite: !task.isFavorite,
    id: task.id,
  };

  const updateTasksFavorite = () => {
    dispatch(updateFavoriteHandler(updateFavoriteParams));
  };

  const inputTextChanger = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    const text = value;
    dispatch(actions.updateEditTaskText(text));
  };

  const updateTaskParams = {
    title: ChangedTaskText,
    id: task.id,
  };

  const updateDone = {
    isDone: !task.isDone,
    id: task.id,
    isListDone: isListDone
  };

  const updateCategoryHandler = () => {
    dispatch(updateDoneHandler(updateDone));
  };

  const changeTaskHandler = () => {
    dispatch(actions.changeHandler(task.id));
    dispatch(actions.updateIsEditStatus());
  };

  const deleteChoosedTask = () => dispatch(deleteTask(task.id));

  const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) =>
    EditHandleEnter(event, updateTaskParams);

  return (
    <div className={classes.task}>
      <div className={classes.taskProperies}>
        <div className={classes.taskDate}>{task.date}</div>
        <Checkbox onClick={updateCategoryHandler} checked={task.isDone} className={classes.taskCheckbox}/>
        <div>
          {categories.map(category => {
            if (category.id === task.categoryId ) {
              return (<span
                  key={task.categoryId}
                  className="material-icons"
                  style={{
                    color: category.color,
                    verticalAlign: "middle",
                    margin: 5,
                  }}
              >
          {category.icon}
        </span>)
            }
          })}
        </div>
        <div className={classes.taskEditForm}>
          {task.isEdit
              ? <TextField
                  className={classes.editField}
                  key={task.id + 1}
                  value={ChangedTaskText}
                  onChange={inputTextChanger}
                  onKeyPress={enterHandler}
              />
              : IsEditStatus
                  ? (<span className={classes.taskTitle}>{task.title}</span>)
                  : (<span onClick={changeTaskHandler} className={classes.taskTitleWithEdit}>{task.title}</span>)
          }
        </div>
      </div>
      <div className={classes.taskButtons}>
        <StyledIconButton className="material-icons" onClick={updateTasksFavorite}>
          {task.isFavorite ? "star" : "star_border"}
        </StyledIconButton>
        <StyledButton aria-label="Delete" onClick={deleteChoosedTask}>
          <ClearIcon color="secondary" />
        </StyledButton>
      </div>
    </div>
  );
};

export default Task;
