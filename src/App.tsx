import { useAppSelector, useAppDispatch } from "./components/Hooks/redux-hooks";
import "./sass/main.scss";
import Header from "./components/Layout/Header";
import Notification from "./components/UI/Notification";
import ProductsList from "./components/Shop/ProductsList";
import Popup from "./components/UI/Popup";
import { useEffect } from "react";
import { getCartData, sendCartData } from "./store/cart-actions";
import { getWishListData, sendWishListData } from "./store/wishList-actions";
import { uiActions } from "./store/ui-slice";

let isCartInitial = true;
let isWishInitial = true;

const App = () => {
  const dispatch = useAppDispatch();
  const showCart = useAppSelector((state) => state.ui.showCart);
  const showWishList = useAppSelector((state) => state.ui.showWishList);
  const cart: any = useAppSelector((state) => state.cart);
  const wishList: any = useAppSelector((state) => state.wish);

  const notification = useAppSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(getCartData());
    dispatch(getWishListData());
  }, [dispatch]);

  useEffect(() => {
    if (isCartInitial) {
      isCartInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
      const timer = setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [cart, dispatch]);

  useEffect(() => {
    if (isWishInitial) {
      isWishInitial = false;
      return;
    }

    if (wishList.changed) {
      dispatch(sendWishListData(wishList));
      const timer = setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [wishList, dispatch]);

  return (
    <>
      <Header />
      {notification && (
        <section className="notification-section">
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        </section>
      )}
      {showCart && <Popup />}
      {showWishList && <Popup />}
      <ProductsList wishList={wishList} />
    </>
  );
};

export default App;
