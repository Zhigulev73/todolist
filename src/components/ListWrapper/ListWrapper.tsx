import React, {useEffect, useState} from "react";
import List from "../List/list";
import UseListHook from "../../hooks/useListHook";
import {useStyles} from "./ListWrapperStyles";
import Filter from "../Filter/Filter";
import {useDispatch, useSelector} from "react-redux";
import {getIsFetching} from "../../redux/selectors/selector";
import Preloader from "../Preloader/Preloader";
import {DateType} from "@date-io/type";
import QueryParams from "../../utils/QueryParams";
import queryString from "query-string";
import {getTasks} from "../../redux/actions";
import {useLocation} from "react-router-dom";

type ListWrapperType = {
    isListDone: boolean;
    selectedDateFrom: DateType | null;
    selectedDateTo: DateType | null;
};

const ListWrapper: React.FC<ListWrapperType> = ({isListDone, selectedDateFrom, selectedDateTo}) => {
    const classes = useStyles();
    const isFetching = useSelector(getIsFetching);
    const locationPath = useLocation();
    const parsed = queryString.parse(location.search);
    const [categoryId, setCategoryId] = useState<string | string[] | null>(() => {
            return parsed.categoryId
    });
    const [dateSort, setDateSort] = useState<boolean>(() => {
        return parsed._sort === ('isFavorite,date' || 'isFavorite,date,title')
    });
    const [nameSort, setNameSort] = useState<boolean>(() => {
        return parsed._sort === ('isFavorite,title' || 'isFavorite,date,title')
    });

    const {
        categories,
        tasks,
        history,
        endNumber,
        unDoneTasks,
        dispatch
    } = UseListHook();

    const [end, setEnd] = useState<number>(endNumber);

    const dateFrom = selectedDateFrom ? (selectedDateFrom.valueOf() - 43150000) : 1577836800000
    const dateTo = selectedDateTo ? (selectedDateTo.valueOf() + 43150000) : 1640995200000

    const onDateSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateSort(e.target.checked);
    };
    const onNameSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameSort(e.target.checked);
    }

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

        dispatch(getTasks({isListDone, end, searchString, dateFrom, dateTo}))

    }, [dateSort, nameSort, categoryId, end, dateFrom, dateTo]);

    return (
        <div className={classes.AppCategoryChanger}>
            <Filter
                onDateSortChange={onDateSortChange}
                onNameSortChange={onNameSortChange}
                dateSort={dateSort}
                nameSort={nameSort}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
            />
            {isFetching
                ? <Preloader /> : null}
            <List
                    tasks={!isListDone ? unDoneTasks : tasks}
                    end={end}
                    setEnd={setEnd}
                    categories={categories}
                    isListDone={isListDone}
                />
        </div>
    );
};

export default ListWrapper;
