import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const addProductToCart = createAsyncThunk(
  "cart/add-cart",
  async (cartData, thunkAPI) => {
    try {
      const response = await cartService.addProductToCart(cartData);
      thunkAPI.dispatch(getCart());
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCart = createAsyncThunk("cart/get-cart", async (thunkAPI) => {
  try {
    const response = await cartService.getCart();
    return response;
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteCartItem = createAsyncThunk(
  "cart/deleted-cart",
  async (cartId, thunkAPI) => {
    try {
      const response = await cartService.deleteCartItem(cartId);
      toast.success("Cart item deleted successfully");
      thunkAPI.dispatch(getCart());
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProductQuantityFromCart = createAsyncThunk(
  "cart/update-product-quantity-cart",
  async (cartData, thunkAPI) => {
    try {
      const response = await cartService.updateProductQuantityFromCart(
        cartData
      );
      toast.success("Cart(product) quantity updated successfully");
      thunkAPI.dispatch(getCart());
      return response;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.addProductToCart = action.payload;
        state.message = "success";
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.message = "success";
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItemDeleted = action.payload;
        state.message = "success";
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProductQuantityFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductQuantityFromCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updateProductQuantityFromCart = action.payload;
        state.message = "success";
      })
      .addCase(updateProductQuantityFromCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export default cartSlice.reducer;
