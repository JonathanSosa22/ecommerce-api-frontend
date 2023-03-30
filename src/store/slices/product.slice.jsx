import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    },
  },
});

export const getProductThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get("https://e-comerce-api.onrender.com/api/v1/products/")
    .then((res) => dispatch(setProduct(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const getCategoryThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get(`https://e-comerce-api.onrender.com/api/v1/products?categoryId=${id}`)
    .then((res) => dispatch(setProduct(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
