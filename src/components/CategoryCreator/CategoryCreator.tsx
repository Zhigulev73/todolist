import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    actions,
    addCategory, updateCategory
} from "../../redux/actions";
import colors from "../../utils/colors";
import icons from "../../utils/icons";
import {getCategoriesFromState, getCategoriesName} from "../../redux/selectors/selector";
import useStyles from "../../pages/Settings/SettingsStyles";
import {Colors, Icons} from "../../api/api";
import Input from "../Input/Input";
import {maxLength} from "../../utils/validators/validators";
import {Icon} from "../Icon/Icon";

type CategoryCreatorType = {
    edit: boolean
    editCategoryId: number | null
    setEdit: (edit: boolean) => void
    setEditCategoryId: (id: number | null) => void;
    setButton: (button: Colors) => void;
    setChoosesIcon: (Icon: Icons) => void;
    button: Colors;
    choosesIcon: Icons;
}

const CategoryCreator: React.FC<CategoryCreatorType> = ({edit, editCategoryId,
                                                            setEdit, setEditCategoryId,
                                                            setButton, setChoosesIcon,
                                                            button, choosesIcon
                                                        }) => {
    const dispatch = useDispatch();

    const categoriesName = useSelector(getCategoriesName);
    const categories = useSelector(getCategoriesFromState);

    const classes = useStyles();

    const [categoryColor, setCategoryColor] = useState<Colors>('black');
    const [categoryIcon, setCategoryIcon] = useState<Icons>('home');
    const [existSameCat, setExistSameCat] = useState<boolean>(false);

    useEffect(() => {
        setCategoryColor(button);
        setCategoryIcon(choosesIcon);
    }, [button, choosesIcon]);

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
        isEdit: false,
    };
    const editCategoryParams = {
        color: categoryColor,
        icon: categoryIcon,
        id: editCategoryId,
    };



    useEffect(() => {
        setExistSameCat(categories.some(category => category.icon === categoryIcon && category.color === categoryColor))
    }, [categories, categoryIcon, categoryColor]);

    const addNewCategory = () => {
        if (categoriesName && categoriesName.length <= 10) {
            dispatch(addCategory(newCategoryParams))
        }
    };
    const editCategory = () => {
            dispatch(updateCategory(editCategoryParams))
            setEdit(false)
            setEditCategoryId(null)
    };

    const AddHandleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (categoriesName && categoriesName.length <= 10 && event.key === "Enter") {
            !existSameCat ? dispatch(addCategory(newCategoryParams)) : null
        }
    };

    return (
        <div>
            {!edit ? (
                <Input
                    value={categoriesName}
                    onChange={onUpdateCategoryName}
                    onKeyPress={AddHandleEnter}
                    error={maxLength(categoriesName)}
                    placeholder='new Category'
                />
            ) : null}
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
                        <Icon color={button} icon={icon}/>
                    </Button>
                ))}
            </div>
            <div>
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={edit ? editCategory : addNewCategory}
                    disabled={edit ? existSameCat
                        : existSameCat
                          ||categoriesName.length > 10
                          || categories.length >= 9
                          || categoriesName.length === 0 }
                >
                    {edit ? 'Edit' : 'Create'}
                </Button>
            </div>
        </div>
    );
};

export default CategoryCreator;
