import React from "react";
import Category from "./Category";
import { CategoryType } from "../../types/types";

type PropsType = {
  categories: CategoryType[];
};

const CategoriesList: React.FC<PropsType> = ({ categories }) => (
  <>
    {categories.map((category) => (
      <Category categories={categories} category={category} key={category.id} />
    ))}
  </>
);

export default CategoriesList;
