import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const puchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const getPurchasesThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://e-comerce-api.onrender.com/api/v1/purchases/", getConfig())
    .then((res) => dispatch(setPurchases(res.data)))
    .finally(() => dispatch(setIsLoading(flase)));
};

export const postPurchasesThunk = (productId) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://e-comerce-api.onrender.com/api/v1/cart/",
      productId,
      getConfig()
    )
    .then(() => dispatch(getPurchasesThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const checkoutCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://e-comerce-api.onrender.com/api/v1/purchases/",
      {},
      getConfig()
    )
    .then(() => dispatch(setPurchases([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setPurchases } = puchasesSlice.actions;

export default puchasesSlice.reducer;
