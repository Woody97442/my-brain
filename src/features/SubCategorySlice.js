import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _FetchDataStrapi from "../tools/_FetchDataStrapi";

const initialState = {
  subCategory: [],
};
const apiUrl = "http://localhost:1337/api/";

export const fetchSubCategory = createAsyncThunk("fetchSubCategory", async (id) => {
  try {
    const subCategory = await _FetchDataStrapi(`${apiUrl}sub-categories/${id}`);
    const data = {
      id: subCategory.data.id,
      name: subCategory.data.attributes.name,
      order: subCategory.data.attributes.order,
      parentName: subCategory.data.attributes.parentName,
      container: subCategory.data.attributes.container,
    };
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    updateSubCategory: (state, { payload }) => {
      state.subCategory = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubCategory.fulfilled, (state, { payload }) => {
      state.subCategory = payload;
    });
  },
});

// Des créateurs d'actions sont générés pour chaque fonction réductrice
export const { updateSubCategory } = subCategorySlice.actions;

export default subCategorySlice.reducer;
