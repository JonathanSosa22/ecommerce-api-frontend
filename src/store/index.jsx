import { configureStore } from "@reduxjs/toolkit";
import addCartSlice from "./slices/addCart.slice";
import isLoadingSlice from "./slices/isLoading.slice";
import productSlice from "./slices/product.slice";
import puchasesSlice from "./slices/purchases.slice";

export default configureStore({
  reducer: {
    products: productSlice,
    isLoading: isLoadingSlice,
    purchases: puchasesSlice,
    addCart: addCartSlice,
  },
});
