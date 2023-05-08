import { WishItems } from "../Models/types";
import { wishActions } from "./wishList-slice";
import { uiActions } from "./ui-slice";
import { WISH_URL } from "../Models/config";
import axios from "axios";

export const getWishListData = () => {
  return async (dispatch: Function) => {
    const getData = async () => {
      const data = await axios.get(WISH_URL);

      if (data.statusText !== "OK") {
        throw new Error("Could not fetch wish list data!");
      }
      return data;
    };

    try {
      const wishData = await getData();
      dispatch(
        wishActions.replaceWishList({
          items: wishData.data.items || [],
          totalQuantity: wishData.data.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendWishListData = (wish: WishItems) => {
  return async (dispatch: Function) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending wish list data",
      })
    );

    const sendWishRequest = async () => {
      const response = await axios.put(WISH_URL, {
        items: wish.items,
        totalQuantity: wish.totalQuantity,
      });

      if (response.statusText !== "OK") {
        throw new Error("Sending wish list data failed.");
      }
    };

    try {
      await sendWishRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Wish list updated!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending wish List data failed",
        })
      );
    }
  };
};
