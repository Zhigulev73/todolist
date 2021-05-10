import React, { useState} from "react";
import List from "../List/list";
import ListHook from "../../hooks/ListHook";
import {useStyles} from "./ListWrapperStyles";
import Filter from "../Filter/Filter";
import {useSelector} from "react-redux";
import {getIsFetching} from "../../redux/selectors/selector";
import Preloader from "../Preloader/Preloader";

type ListWrapperType = {
    isListDone: boolean;
};

const ListWrapper: React.FC<ListWrapperType> = ({isListDone}) => {
    const classes = useStyles();
    const isFetching = useSelector(getIsFetching);

    const {
        categories,
        tasks,
        endNumber,
    } = ListHook();

    const [end, setEnd] = useState<number>(endNumber);

    return (
        <div className={classes.AppCategoryChanger}>
            <Filter isListDone={isListDone} end={end}/>
            {isFetching
                ? <Preloader /> : null}
            <List
                    tasks={tasks}
                    end={end}
                    setEnd={setEnd}
                    categories={categories}
                    isListDone={isListDone}
                />

        </div>
    );
};

export default ListWrapper;
