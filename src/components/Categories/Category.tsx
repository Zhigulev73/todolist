import React, {useState} from "react";
import {useSelector} from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import {deleteCategory, updateCategoryIcon, updateDefaultCategory} from "../../redux/actions";
import {BootstrapButton, useStyles} from "./CategoryStyles";
import {CategoryType} from "../../types/types";
import {selectDefaultCategoryId} from "../../redux/selectors/selector";
import ListHook from "../../hooks/ListHook";
import Button from "@material-ui/core/Button";
import {Colors, Icons} from "../../api/api";
import icons from "../../utils/icons";

type CategoryPropsType = {
    category: CategoryType;
    categories: CategoryType[];
};

const Category: React.FC<CategoryPropsType> = ({category, categories}) => {
    const [categoryColor, setCategoryColor] = useState<Colors>(category.color);
    const [categoryIcon, setCategoryIcon] = useState<Icons>(category.icon);
    const [edit, setEdit] = useState<boolean>(false);
    const classes = useStyles();
    const {
        dispatch
    } = ListHook();
    const categoryId = useSelector(selectDefaultCategoryId);

    const onUpdateCategoryIcon = (icon: Icons) => {
        setCategoryIcon(icon);
    };

    const setNewDefaultCategory = () => {
        dispatch(updateDefaultCategory(category.id));
    };

    const deleteCategories = () => {
        dispatch(deleteCategory(category.id));
    };

    return (
        <div className={classes.CategoryPageContainer}>
            <div className={classes.CategoryPageRow}>
                <div className={classes.CategoryParams}>
                    {edit
                        ? (<div>
                            {icons.map((icon) => (
                                <Button
                                    key={icon}
                                    onClick={() => {
                                        onUpdateCategoryIcon(icon);
                                        dispatch(updateCategoryIcon({icon: icon,
                                            id: category.id}))
                                        setEdit(false)
                                    }}
                                >
                                    <span className="material-icons">{icon}</span>
                                </Button>
                            ))}
                        </div>)
                        : <Button
                            onClick={() => {
                                setEdit(true)
                            }}
                        >
                        <span className="material-icons" style={{color: categoryColor}}>
             {categoryIcon}
            </span>
                        </Button>}
                    <p className={classes.CategoryParamsName}>{category.name}</p>
                </div>
                <div>
                    {categoryId !== category.id
                        ? (<IconButton aria-label="Delete"
                                       onClick={deleteCategories}
                        >
                            <ClearIcon color={'secondary'}/>
                        </IconButton>)
                        : null}
                </div>
            </div>
            <div>
                <BootstrapButton size="small" onClick={setNewDefaultCategory}>
                    Add Default Category
                </BootstrapButton>
            </div>
        </div>
    );
};

export default Category;
