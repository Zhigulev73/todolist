import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Task, {TaskType} from "../Task/task";
import Preloader from "../Preloader/Preloader";
import {CategoryType} from "../../types/types";
import classes from "./list.module.css";
import fadeTransition from "./fade.module.css";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

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


    useEffect(() => {
        end <= tasks.length ? setHasMore(true) : setHasMore(false);
    }, [tasks.length, end]);

    return (
        <>
            <div className={classes.listScroll} id="scrollableDiv">
                <InfiniteScroll
                    dataLength={tasks.length}
                    next={() => setEnd(end + 8)}
                    hasMore={hasMore}
                    loader={<Preloader/>}
                    endMessage={
                        <p style={{textAlign: "center"}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    <TransitionGroup>
                        {tasks.map((task) => (
                            <CSSTransition
                                key={task.id}
                                timeout={400}
                                classNames={fadeTransition}
                            >
                                <Task
                                    categories={categories}
                                    task={task}
                                    key={task.id}
                                    isListDone={isListDone}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </InfiniteScroll>
            </div>
        </>
    );
};

export default List;
