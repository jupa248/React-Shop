import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Items, ShortCartItem } from "../Models/types";

export type WishInitialState = {
  items: Items[];
  totalQuantity: number;
  isWished: boolean;
  changed: boolean;
};

const initialState: WishInitialState = {
  items: [],
  totalQuantity: 0,
  isWished: false,
  changed: false,
};

const wishListSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    toggleIsWish(state) {
      state.isWished = !state.isWished;
    },
    replaceWishList(state, action: PayloadAction<ShortCartItem>) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addToWishList(state, action: PayloadAction<Items>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.totalQuantity++;
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          title: newItem.title,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
          isWished: newItem.isWished,
        });
        state.changed = true;
      }
    },
    removeFromWishList(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem: any = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.isWished = false;
        state.items = state.items.filter((item) => item.id !== id);
      }
      state.changed = true;
    },

    clearWishList(state) {
      state.totalQuantity = 0;
      state.changed = true;
      state.items = [];
    },
  },
});

export const wishActions = wishListSlice.actions;

export default wishListSlice;
