import Switch from "@material-ui/core/Switch";
import React, {useEffect, useState} from "react";
import {useStyles} from "../ListWrapper/ListWrapperStyles";
import ListHook from "../../hooks/ListHook";
import queryString from "query-string";
import QueryParams from "../../utils/QueryParams";
import {useDispatch} from "react-redux";
import {actions, getNewTasks, getTasks} from "../../redux/actions";
import { useLocation } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import {Icon} from "../Icon/Icon";
import {Select} from "@material-ui/core";

type SwitchesType = {
    title: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type FilterType = {
    isListDone: boolean;
    end: number;
};

const Filter: React.FC<FilterType> = ({end, isListDone }) => {

    const classes = useStyles();
    const parsed = queryString.parse(location.search);
    const dispatch = useDispatch();
    const [opened, setOpened] = useState<boolean>(false);
    const locationPath = useLocation();
    const {
        categories,
        history,
        dateSort,
        nameSort,
        onNameSortChange,
        onDateSortChange,
        categoryId,
        setCategoryId,
        setNameSort,
        setDateSort,
    } = ListHook();

    const onOpen = () => {
        setOpened(true);
    };
    const onClose = () => {
        setOpened(false);
    };

    const handleChangeCategory = (event: React.ChangeEvent<{name?: string | undefined, value: unknown}>) => {
        event.target.value !== 51 ? setCategoryId(`${event.target.value}`) : setCategoryId(null)
    };

    useEffect(() => {
        parsed.categoryId
            ? setCategoryId(parsed.categoryId)
            : null;
        switch (parsed._sort) {
            case "isFavorite,date": {
                setDateSort(true);
                QueryParams._sort[1] = "date";
                QueryParams._order[1] = "asc";
                break;
            }
            case "isFavorite,title": {
                setNameSort(true);
                QueryParams._sort[2] = "title";
                QueryParams._order[2] = "asc";
                break;
            }
            case "isFavorite,date,title": {
                setDateSort(true);
                QueryParams._sort[1] = "date";
                QueryParams._order[1] = "asc";
                setNameSort(true);
                QueryParams._sort[2] = "title";
                QueryParams._order[2] = "asc";
                break;
            }
            default:
                break;
        }

        const searchString = queryString.stringify(QueryParams, {
            skipNull: true,
            arrayFormat: "comma",
        });

        dispatch(getTasks({isListDone, end, searchString}));
    }, []);

    useEffect(() => {
        QueryParams._sort[1] = dateSort ? "date" : null;
        QueryParams._sort[2] = nameSort ? "title" : null;
        QueryParams._order[1] = dateSort ? "asc" : null;
        QueryParams._order[2] = nameSort ? "asc" : null;
        QueryParams.categoryId = categoryId;

        const searchString = queryString.stringify(QueryParams, {
            skipNull: true,
            arrayFormat: "comma",
        });

        history.push({
            pathname: locationPath.pathname,
            search: searchString,
        });

        dispatch(getNewTasks({isListDone, end, searchString}))

    }, [dateSort, nameSort, categoryId, end]);

    const completedTasksSwitches: SwitchesType[] = [
        {
            title: "Sort Task by date",
            checked: dateSort,
            onChange: onDateSortChange,
        },
        {
            title: "Sort Task by name",
            checked: nameSort,
            onChange: onNameSortChange,
        },
    ];

    return (
        <div>
            <div className={classes.AppCategoryChanger}>
                <Select
                    onOpen={onOpen}
                    onClose={onClose}
                    onChange={handleChangeCategory}
                    value={categoryId}
                    style={{ width: 130 }}
                >
                    {
                        categories.map(({
                                            id, color, icon, name
                                        }) => (
                            <MenuItem key={id} value={id}>
                                <>
                                    <Icon color={color} icon={icon} />
                                    {opened && name}
                                </>
                            </MenuItem>
                        ))
                    }
                    <MenuItem value={51}>Clear</MenuItem>
                </Select>
            </div>
            <div className={classes.AppSwitches}>
                {completedTasksSwitches.map(({ checked, onChange, title }, index) => (
                    <div key={index}>
                        <span>{title}</span>
                        <Switch
                            checked={checked}
                            onChange={onChange}
                            color="default"
                            name="checkedB"
                            inputProps={{ "aria-label": "checkbox with default color" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;