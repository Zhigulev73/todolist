import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {
    actions,
    addTask,
} from "../../redux/actions";
import {
    getCategoriesFromState,
    selectDefaultCategoryId,
    getNewTaskText,
} from "../../redux/selectors/selector";
import ListWrapper from "../../components/ListWrapper/ListWrapper";
import {NewTaskParamsType} from "../../types/types";
import {useStyles} from "./ToDoListsStyles";
import Input from "../../components/Input/Input";
import {maxLength} from "../../utils/validators/validators";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {Icon} from "../../components/Icon/Icon";

type DateType = MaterialUiPickersDate | null;

const toDoLists: React.FC = () => {
    const newTaskText = useSelector(getNewTaskText);
    const categoryId = useSelector(selectDefaultCategoryId);
    const categories = useSelector(getCategoriesFromState);
    const [opened, setOpened] = useState<boolean>(false);
    const [category, setCategory] = useState<number | null>(categoryId);
    const [taskDate, setTaskDate] = useState(new Date(Date.now()));
    const [selectedDateFrom, setSelectedDateFrom] = useState<DateType | null>(
        null
    );
    const [selectedDateTo, setSelectedDateTo] = useState<DateType | null>(
        null
    );
    const [selectDateFrom, setSelectDateFrom] = useState<DateType | null>(
        null
    );
    const [selectDateTo, setSelectDateTo] = useState<DateType | null>(
        null
    );
    const dispatch = useDispatch();

    useEffect(() => {
        setCategory(categoryId);
    }, [categoryId]);

    const handleDateFromChange = (date: DateType | null) => {
        setSelectedDateFrom(date);
    };
    const handleDateToChange = (date: DateType | null) => {
        setSelectedDateTo(date);
    };

    const handleChangeCategory = (event: React.ChangeEvent<{name?: string | undefined, value: unknown}>) => {
        dispatch(actions.setCategory(event.target.value as number));
    };

    const onOpen = () => {
        setOpened(true);
    };
    const onClose = () => {
        setOpened(false);
    };

    const NewTaskParams: NewTaskParamsType = {
        title: newTaskText,
        isDone: false,
        isEdit: false,
        categoryId: categoryId,
        date: taskDate.valueOf(),
        isFavorite: false,
    };

    const AddHandleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (newTaskText && newTaskText.length < 10 && e.key === "Enter") {
            dispatch(addTask(NewTaskParams));
        }
    };

    const inputTextChanger = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const {value} = event.target;
        const text = value;
        dispatch(actions.updateNewMessageText(text));
    };

    const classes = useStyles();


    const setSelectDate = () => {
        setSelectDateFrom(selectedDateFrom)
        setSelectDateTo(selectedDateTo)
    }

    return (
        <div>
            <div className={classes.AppPageMainTitle}>
                <h1>Tasks</h1>
            </div>
            <div className={classes.AppList}>
                <div className={classes.AppTaskCreator}>
                    <Input
                        value={newTaskText}
                        onChange={inputTextChanger}
                        onKeyPress={AddHandleEnter}
                        error={maxLength(newTaskText)}
                        placeholder='new Task'
                    />
                    { category !== null ?
                        <Select
                        onOpen={onOpen}
                        onClose={onClose}
                        onChange={handleChangeCategory}
                        value={category}
                        >
                        {
                            categories.map(({
                                                id, color, icon, name
                                            }) => (
                                <MenuItem key={id} value={id}>
                                    <>
                                        <Icon color={color} icon={icon}/>
                                        {opened && name}
                                    </>
                                </MenuItem>
                            ))
                        }
                        </Select> : null}
                    <Button
                        className={classes.AppButton}
                        variant="outlined"
                        color="primary"
                        disabled={newTaskText.length === 0 || newTaskText.length > 10}
                        onClick={() => {
                            newTaskText && newTaskText.length < 10 && dispatch(addTask(NewTaskParams));
                        }}
                    >
                        ADD
                    </Button>
                </div>
                <div>
                    <h5>Фильтрация по периоду:</h5>
                    <div className={classes.AppListDateFilter}>
                        <span className={classes.AppText}>с</span>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        value={selectedDateFrom}
                        onChange={handleDateFromChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        style={{width: 180, marginBottom: "20px", marginRight: "20px"}}
                        disableToolbar
                    />
                </MuiPickersUtilsProvider>
                        <span className={classes.AppText}>по</span>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        id="date-picker-inline2"
                        value={selectedDateTo}
                        onChange={handleDateToChange}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        style={{width: 180, marginBottom: "20px"}}
                        disableToolbar
                    />
                </MuiPickersUtilsProvider>
                    </div>
                    <Button
                        variant="outlined"
                        onClick={setSelectDate}
                    >
                        Filter
                    </Button>
                </div>
                <ListWrapper isListDone={false} selectedDateFrom={selectDateFrom} selectedDateTo={selectDateTo}/>
            </div>
        </div>
    );
};

export default toDoLists;
