import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Task, {TaskType} from "../Task/task";
import Preloader from "../Preloader/Preloader";
import {CategoryType} from "../../types/types";
import classes from "./list.module.scss";
import FlipMove from 'react-flip-move';

type PropsType = {
    tasks: Array<TaskType>;
    end: number;
    setEnd: (end: number) => void;
    categories: CategoryType[];
    isListDone: boolean
};

const List: React.FC<PropsType> = ({
                                       tasks,
                                       end,
                                       setEnd,
                                       categories,
                                       isListDone,
                                   }) => {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [tasksLength, setTasksLength] = useState<number>(0);
    const [sortTasks, setSortTasks] = useState<TaskType[]>(tasks);

    useEffect(() => {
        setSortTasks(tasks
            .filter(task => task.isDone === isListDone)
            .sort((a) => a.isFavorite ? -1 : 1))
    }, [tasks]);

    useEffect(() => {
        end <= tasks.length ? setHasMore(true) : setHasMore(false);
        setTasksLength(tasks.length)
    }, [tasks.length, end]);

    return (
        <>
            <div className={classes.listScroll}>
                <InfiniteScroll
                    dataLength={tasksLength}
                    next={() => setEnd(end + 4)}
                    hasMore={hasMore}
                    loader={<Preloader/>}
                    endMessage={
                        <p style={{textAlign: "center"}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                        <FlipMove>
                        {/*{tasks.map((task) => (*/}
                        {/*        <Task*/}
                        {/*            categories={categories}*/}
                        {/*            task={task}*/}
                        {/*            key={task.id}*/}
                        {/*            isListDone={isListDone}*/}
                        {/*            setEnd={setEnd}*/}
                        {/*            end={end}*/}
                        {/*        />*/}
                        {/*))}*/}
                            {sortTasks.map((task) => (
                                <Task
                                    categories={categories}
                                    task={task}
                                    key={task.id}
                                    isListDone={isListDone}
                                    setEnd={setEnd}
                                    end={end}
                                />
                            ))}
                        </FlipMove>
                </InfiniteScroll>
            </div>
        </>
    );
};

export default List;
