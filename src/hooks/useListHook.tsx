import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {
  getCategoriesFromState, getDoneTasksFromState,
  getEndNumber,
  getIsFetching,
  getTasksFromState,
} from "../redux/selectors/selector";
import {getCategories, getDefaultCategory} from "../redux/actions";

const UseListHook = () => {
  const history = useHistory();

  const tasks = useSelector(getTasksFromState);
  const unDoneTasks = useSelector(getDoneTasksFromState);
  const categories = useSelector(getCategoriesFromState);
  const isFetching = useSelector(getIsFetching);
  const endNumber = useSelector(getEndNumber);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDefaultCategory());
  }, []);

  return {
    tasks,
    unDoneTasks,
    categories,
    isFetching,
    history,
    endNumber,
    dispatch
  };
};

export default UseListHook;
