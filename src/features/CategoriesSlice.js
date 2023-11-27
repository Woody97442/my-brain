import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _FetchDataStrapi from "../tools/_FetchDataStrapi";

const initialState = {
  categories: [],
};
const apiUrl = "http://localhost:1337/api/";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  try {
    const apiUrl = "http://localhost:1337/api/";
    const categories = await _FetchDataStrapi(`${apiUrl}categories?populate=*`);

    const data = categories.data.map((categorie) => {
      return {
        id: categorie.id,
        name: categorie.attributes.name,
        sub_categories: categorie.attributes.sub_categories.data.map((sub) => {
          return {
            id: sub.id,
            name: sub.attributes.name,
            order: sub.attributes.order,
            parentName: sub.attributes.parentName,
            container: sub.attributes.container,
          };
        }),
        type: categorie.attributes.type,
      };
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
  },
});

// Des créateurs d'actions sont générés pour chaque fonction réductrice
export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
