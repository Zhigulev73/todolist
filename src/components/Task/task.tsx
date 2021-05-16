import React, {ChangeEvent, forwardRef, LegacyRef} from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import classes from "./task.module.scss";
import {
  actions,
  deleteTask,
  updateTask,
} from "../../redux/actions";
import {CategoryType} from "../../types/types";
import {
  getChangedTaskText,
} from "../../redux/selectors/selector";
import Checkbox from "@material-ui/core/Checkbox";
import {StyledButton, StyledIconButton} from "./taskStyles";
import Input from "../Input/Input";
import {maxLength} from "../../utils/validators/validators";

export type TaskType = {
  title: string;
  isDone: boolean;
  isEdit: boolean;
  id: number;
  isFavorite: boolean;
  categoryId: number;
  date: number;
};

type PropsType = {
  task: TaskType;
  categories: CategoryType[];
  isListDone:boolean;
  setEnd: (end: number) => void;
  end: number;
};

const Task: React.FC<PropsType> = forwardRef(({ task, categories, isListDone, setEnd, end}, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const dispatch = useDispatch();

  const ChangedTaskText = useSelector(getChangedTaskText);

  const updateTextParams = {
    id: task.id,
    title: ChangedTaskText
  }

  const EditHandleEnter = (
      e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Enter") {
      dispatch(updateTask({
        isFavorite: task.isFavorite,
        id: task.id,
        isDone: task.isDone,
        title: ChangedTaskText,
        isListDone: isListDone,
      }))
      dispatch(actions.EditTaskText(updateTextParams));
    }
  };



  const updateTasksFavorite = () => {
    dispatch(updateTask({
      isFavorite: !task.isFavorite,
      id: task.id,
      isDone: task.isDone,
      title: task.title,
      isListDone: isListDone,
    }))
    dispatch(actions.changeFavoriteStatus(task.id))
  };

  const inputTextChanger = (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    const text = value;
    dispatch(actions.updateEditTaskText(text));
  };



  const updateCategoryHandler = () => {
    dispatch(updateTask({
      isFavorite: task.isFavorite,
      isDone: !task.isDone,
      id: task.id,
      title: task.title,
      isListDone: isListDone,
    }))
    dispatch(actions.changeTaskStatus(task.id, isListDone))
  };

  const changeTaskHandler = () => {
    dispatch(actions.changeHandler(task.id));
  };

  const deleteChoosedTask = () => {
    dispatch(deleteTask(task.id));
    setEnd(end - 1)
  }

  const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    ChangedTaskText.length > 0
        ? EditHandleEnter(event) : null;
  }

  return (
      <div className={classes.task} ref={ref}>
        <div className={classes.taskProperies}>
          <div className={classes.taskDate}>{`${new Date(task.date).toLocaleDateString()}`}</div>
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
                ?
                <Input
                    value={ChangedTaskText}
                    onChange={inputTextChanger}
                    onKeyPress={enterHandler}
                    error={maxLength(ChangedTaskText)}
                    placeholder='edit task'
                />
                :
                     // (<span className={classes.taskTitle}>{task.title}</span>)
                    (<span onClick={changeTaskHandler} className={classes.taskTitleWithEdit}>{task.title}</span>)
            }
          </div>
        </div>
        <div className={classes.taskButtons}>
          {!isListDone ? <StyledIconButton className="material-icons" onClick={updateTasksFavorite}>
            {task.isFavorite ? "star" : "star_border"}
          </StyledIconButton> : null}
          <StyledButton aria-label="Delete" onClick={deleteChoosedTask}>
            <ClearIcon color="secondary" />
          </StyledButton>
        </div>
      </div>
  );
});

export default Task;
