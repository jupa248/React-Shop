import { useAppDispatch, useAppSelector } from "../Hooks/redux-hooks";
import { uiActions } from "../../store/ui-slice";
import Button from "../UI/Button";
import { useState, useEffect } from "react";

const WishListButton = () => {
  const dispatch = useAppDispatch();
  const wishQuantity = useAppSelector((state) => state.wish.totalQuantity);
  const [btnWishAnimation, setBtnWishAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (wishQuantity + 1) setBtnWishAnimation(true);
    const timer = setTimeout(() => {
      setBtnWishAnimation(false);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [wishQuantity]);

  const toggleHandler = () => {
    dispatch(uiActions.toggleWish());
  };

  const buttonClasses = wishQuantity > 0 ? "button-has-item" : "button";
  const iconClass = btnWishAnimation ? "icon bump" : "icon";

  return (
    <Button
      onClick={toggleHandler}
      quantity={wishQuantity}
      title={"Wish List"}
      classes={buttonClasses}
      classIcon={iconClass}
      action={""}
    />
  );
};

export default WishListButton;
