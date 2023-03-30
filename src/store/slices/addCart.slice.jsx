import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";

export const addCartSlice = createSlice({
  name: "addCart",
  initialState: [],
  reducers: {
    setAddCart: (state, action) => {
      return action.payload;
    },
  },
});

export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get("https://e-comerce-api.onrender.com/api/v1/cart/", getConfig())
    .then((res) => dispatch(setAddCart(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setAddCart } = addCartSlice.actions;

export default addCartSlice.reducer;
