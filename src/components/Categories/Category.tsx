import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import {
    actions,
    deleteCategory,
    updateCategoryText,
} from "../../redux/actions";
import {useStyles} from "./CategoryStyles";
import {CategoryType, updateCategoryParamsType} from "../../types/types";
import {
    getChangedCategoryText,
    selectDefaultCategoryId
} from "../../redux/selectors/selector";
import Button from "@material-ui/core/Button";
import {Colors, Icons} from "../../api/api";
import Input from "../Input/Input";
import {maxLength} from "../../utils/validators/validators";
import {makeStyles} from "@material-ui/core/styles";

type CategoryPropsType = {
    category: CategoryType;
    setEdit: (edit: boolean) => void;
    setEditCategoryId: (id: number) => void;
    editCategoryId: number | null;
    setButton: (button: Colors) => void;
    setChoosesIcon: (Icon: Icons) => void
};

const Category: React.FC<CategoryPropsType> = ({category, setEdit,
                                                   setEditCategoryId, editCategoryId,
                                                   setButton, setChoosesIcon}) => {
    const {color, id, name, icon, isEdit} = category

    const useStylesSpan = makeStyles({
        CategoryIcon: {
            color: color
        }
    });

    const iconClasses = useStylesSpan();
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryId = useSelector(selectDefaultCategoryId);
    const ChangedCategoryText = useSelector(getChangedCategoryText);

    const updateCategoryParams = {
        name: ChangedCategoryText,
        id: id,
    };

    const deleteChoosedCategory = () => {
        dispatch(deleteCategory(id));
        setEditCategoryId(id);
    };

    const inputTextChanger = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { value } = event.target;
        const text = value;
        dispatch(actions.updateEditCategoryText(text));
    };

    const EditHandleEnter = (
        e: React.KeyboardEvent<HTMLDivElement>,
        updateCategoryParams: updateCategoryParamsType
    ) => {
        if (e.key === "Enter") {
            dispatch(updateCategoryText(updateCategoryParams));
        }
    };

    const enterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        ChangedCategoryText.length > 0
            ? EditHandleEnter(event, updateCategoryParams) : null;
    }

    const changeCategoryHandler = () => {
        dispatch(actions.changeCategoryHandler(id));
    };

    return (
        <div className={classes.CategoryPageContainer}>
            <div className={classes.CategoryPageRow}>
                <div className={classes.CategoryParams}>
                    <Button
                            onClick={() => {
                                setEdit(true)
                                setEditCategoryId(id)
                                setButton(color)
                                setChoosesIcon(icon)
                            }}
                        >
                        <span className={`${iconClasses.CategoryIcon} material-icons`}>
             {icon}
            </span>
                        </Button>
                    {isEdit
                        ?
                        <Input
                            value={ChangedCategoryText}
                            onChange={inputTextChanger}
                            onKeyPress={enterHandler}
                            error={maxLength(ChangedCategoryText)}
                            placeholder='edit category'
                        />
                        : (<span onClick={changeCategoryHandler} className={classes.categoryTitleWithEdit}>{name}</span>)
                    }
                </div>
                <div>
                    {categoryId !== id && (<IconButton aria-label="Delete"
                                       onClick={deleteChoosedCategory}
                                       disabled={editCategoryId === id}
                        >
                            <ClearIcon color={'secondary'}/>
                        </IconButton>)
                        }
                </div>
            </div>
        </div>
    );
};

export default Category;
