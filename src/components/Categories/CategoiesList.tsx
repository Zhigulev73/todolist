import React from "react";
import Category from "./Category";
import { CategoryType } from "../../types/types";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import fadeTransition from "../List/fade.module.scss";
import {Colors, Icons} from "../../api/api";

type PropsType = {
  categories: CategoryType[];
  setEdit: (edit: boolean) => void;
  editCategoryId: number | null;
  setEditCategoryId: (id: number | null) => void;
  setButton: (button: Colors) => void;
  setChoosesIcon: (Icon: Icons) => void
};

const CategoriesList: React.FC<PropsType> = ({ categories, setEdit,
                                                 setEditCategoryId, editCategoryId,
                                                 setChoosesIcon, setButton}) => (
  <>
    <TransitionGroup>
    {categories.map((category) => (
        <CSSTransition
            key={category.id}
            timeout={400}
            classNames={fadeTransition}
        >
      <Category category={category} key={category.id}
                setEdit={setEdit} setEditCategoryId={setEditCategoryId}
                editCategoryId={editCategoryId}
                setButton={setButton} setChoosesIcon={setChoosesIcon}
      />
        </CSSTransition>
    ))}
    </TransitionGroup>
  </>
);

export default CategoriesList;
