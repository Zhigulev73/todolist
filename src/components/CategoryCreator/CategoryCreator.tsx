import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";
import {
    actions,
    addCategory, getCategories, getDefaultCategory
} from "../../redux/actions";
import colors from "../../utils/colors";
import icons from "../../utils/icons";
import {getCategoriesFromState, getCategoriesName} from "../../redux/selectors/selector";
import useStyles from "../../pages/Settings/SettingsStyles";
import {Colors, Icons} from "../../api/api";
import Input from "../Input/Input";
import {maxLength} from "../../utils/validators/validators";
import ListHook from "../../hooks/ListHook";
import {CategoryType} from "../../types/types";


const CategoryCreator: React.FC = () => {
    const {
        dispatch
    } = ListHook();

    const categoriesName = useSelector(getCategoriesName);
    const categories = useSelector(getCategoriesFromState);

    const classes = useStyles();

    const [categoryColor, setCategoryColor] = useState<Colors>("black");
    const [categoryIcon, setCategoryIcon] = useState<Icons>("home");
    const [button, setButton] = useState<string>("");
    const [choosesIcon, setChoosesIcon] = useState<string>("");
    const [exist, setExist] = useState<CategoryType | undefined>(undefined);

    const onUpdateCategoryName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const text = event.target.value;
        dispatch(actions.updateCategoryText(text));
    };
    const onUpdateCategoryColor = (color: Colors) => {
        setCategoryColor(color);
    };
    const onUpdateCategoryIcon = (icon: Icons) => {
        setCategoryIcon(icon);
    };

    const newCategoryParams = {
        name: categoriesName,
        color: categoryColor,
        icon: categoryIcon,
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getDefaultCategory());
    }, []);

    useEffect(() => {
        setExist(categories.find(category => category.icon == categoryIcon && category.color == categoryColor))
    }, [categories, categoryIcon, categoryColor]);

    const addNewCategory = () => {
        if (categoriesName && categoriesName.length <= 10) {
            exist === undefined ? dispatch(addCategory(newCategoryParams)) : null
        }
    };

    const AddHandleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (categoriesName && categoriesName.length <= 10 && event.key === "Enter") {
                exist === undefined ? dispatch(addCategory(newCategoryParams)) : null
        }
    };

    return (
        <div>
            <Input
                value={categoriesName}
                onChange={onUpdateCategoryName}
                onKeyPress={AddHandleEnter}
                error={maxLength(categoriesName)}
            />
            <h3>Color</h3>
            <div className={classes.SettingsCategoryCreator}>
                {colors.map((color) => (
                    <Button
                        key={color}
                        className={button === color ? classes.SettingsColorButtonActive : classes.SettingsColorButton}
                        style={{background: `${color}`}}
                        onClick={() => {
                            onUpdateCategoryColor(color);
                            setButton(color);
                        }}
                    />
                ))}
            </div>
            <h3>Icon</h3>
            <div className={classes.SettingsCategoryCreator}>
                {icons.map((icon) => (
                    <Button
                        key={icon}
                        onClick={() => {
                            onUpdateCategoryIcon(icon);
                            setChoosesIcon(icon)
                        }}
                        className={choosesIcon === icon ? classes.SettingsColorButtonActive : classes.SettingsColorButton}
                    >
                        <span className="material-icons">{icon}</span>
                    </Button>
                ))}
            </div>
            <div>
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={addNewCategory}
                    disabled={categoriesName.length > 10 || categories.length >= 9}
                >
                    Create
                </Button>
            </div>
        </div>
    );
};

export default CategoryCreator;
