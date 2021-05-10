import React from "react";
import { useSelector } from "react-redux";
import CategoriesList from "../../components/Categories/CategoiesList";
import CategoryCreator from "../../components/CategoryCreator/CategoryCreator";
import {
  getCategoriesFromState,
  selectDefaultCategoryId,
} from "../../redux/selectors/selector";
import useStyles from "./SettingsStyles";
import {Icon} from "../../components/Icon/Icon";

const Settings: React.FC = () => {
  const classes = useStyles();
  const categories = useSelector(getCategoriesFromState);
  const categoryId = useSelector(selectDefaultCategoryId);

  const defaultCategory = categories.find(category => category.id === categoryId)

  return (
    <div>
      <h1 className={classes.SettingsMainTitle}>Settings</h1>
      <div className={classes.SettingsPageContainer}>
        <div>
          <h2>Categories Maker</h2>
          <CategoryCreator />
        </div>
        <div className={classes.SettingsPageCategories}>
          <div>
            <h2>Categories</h2>
          </div>
          <CategoriesList categories={categories} />
          <h4>Default category: </h4>
          {
                  <>
                    <Icon color={defaultCategory?.color} icon={defaultCategory?.icon} />
                    {defaultCategory?.name}
                  </>
          }
        </div>
      </div>
    </div>
  );
};

export default Settings;
