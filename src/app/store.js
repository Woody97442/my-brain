import { configureStore } from "@reduxjs/toolkit";
import CategoriesReducer from "../features/CategoriesSlice";
import SubCategoryReducer from "../features/SubCategorySlice";

export const store = configureStore({
  reducer: {
    dataCat: CategoriesReducer,
    dataSubCat: SubCategoryReducer,
  },
});
