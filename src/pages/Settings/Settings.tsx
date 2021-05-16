import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CategoriesList from "../../components/Categories/CategoiesList";
import CategoryCreator from "../../components/CategoryCreator/CategoryCreator";
import {
  getCategoriesFromState,
  selectDefaultCategoryId,
} from "../../redux/selectors/selector";
import useStyles from "./SettingsStyles";
import {Icon} from "../../components/Icon/Icon";
import {Colors, Icons} from "../../api/api";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {actions, getCategories, getDefaultCategory, updateDefaultCategory} from "../../redux/actions";


const Settings: React.FC = () => {
  const classes = useStyles();
  const categories = useSelector(getCategoriesFromState);
  const categoryId = useSelector(selectDefaultCategoryId);
  const [category, setCategory] = useState<number | null>(categoryId);
  const [opened, setOpened] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [button, setButton] = useState<Colors>("black");
  const [choosesIcon, setChoosesIcon] = useState<Icons>("home");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDefaultCategory());
  }, []);

  useEffect(() => {
    setCategory(categoryId);
  }, [categoryId]);

  const dispatch = useDispatch();

  const onOpen = () => {
    setOpened(true);
  };
  const onClose = () => {
    setOpened(false);
  };

  const handleChangeCategory = (event: React.ChangeEvent<{name?: string | undefined, value: unknown}>) => {
    dispatch(actions.setCategory(event.target.value as number));
    dispatch(updateDefaultCategory(event.target.value as number));
  };

  return (
    <div>
      <h1 className={classes.SettingsMainTitle}>Settings</h1>
      <div className={classes.SettingsPageContainer}>
        <div>
          <h2>{edit ? 'Edit Icon' : 'Categories Maker'}</h2>
          <CategoryCreator edit={edit} editCategoryId={editCategoryId}
                           setEditCategoryId={setEditCategoryId} setEdit={setEdit}
                           setButton={setButton} setChoosesIcon={setChoosesIcon}
                           button={button} choosesIcon={choosesIcon}
          />
        </div>
        <div className={classes.SettingsPageCategories}>
          <div>
            <h2>Categories</h2>
          </div>
          <CategoriesList categories={categories} setEdit={setEdit}
                          setEditCategoryId={setEditCategoryId}
                          editCategoryId={editCategoryId}
                          setButton={setButton}
                          setChoosesIcon={setChoosesIcon}
          />
          <h4>Default category: </h4>
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
