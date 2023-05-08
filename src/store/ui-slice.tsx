import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notif } from "../Models/types";

type InitialState = {
  showCart: boolean;
  showWishList: boolean;
  notification: null | Notif;
};

const initialState: InitialState = {
  showCart: false,
  showWishList: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
    toggleWish(state) {
      state.showWishList = !state.showWishList;
    },
    showNotification(state, action: PayloadAction<Notif>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
