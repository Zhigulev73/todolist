import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
  getCategoriesFromState,
  getEndNumber,
  getIsFetching,
  getTasksFromState,
} from "../redux/selectors/selector";
import {getCategories, getDefaultCategory} from "../redux/actions";

const ListHook = () => {
  const history = useHistory();

  const tasks = useSelector(getTasksFromState);
  const categories = useSelector(getCategoriesFromState);
  const isFetching = useSelector(getIsFetching);
  const endNumber = useSelector(getEndNumber);
  const dispatch = useDispatch();
  const [dateSort, setDateSort] = useState<boolean>(false);
  const [nameSort, setNameSort] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string | string[] | null>(null);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDefaultCategory());
  }, []);


  const onDateSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateSort(e.target.checked);
  };
  const onNameSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSort(e.target.checked);
  };

  return {
    tasks,
    categories,
    isFetching,
    history,
    endNumber,
    dateSort,
    nameSort,
    onDateSortChange,
    onNameSortChange,
    categoryId,
    setCategoryId,
    setDateSort,
    setNameSort,
    dispatch
  };
};

export default ListHook;
