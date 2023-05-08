import { useAppDispatch, useAppSelector } from "../Hooks/redux-hooks";
import { useEffect, useState } from "react";
import { uiActions } from "../../store/ui-slice";
import Button from "../UI/Button";

const CartButton = () => {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const [btnCartAnimation, setBtnCartAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (cartQuantity + 1) setBtnCartAnimation(true);
    const timer = setTimeout(() => {
      setBtnCartAnimation(false);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [cartQuantity]);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const buttonClasses = cartQuantity > 0 ? "button-has-item" : "button";
  const iconClass = btnCartAnimation ? "icon bump" : "icon";

  return (
    <Button
      onClick={toggleCartHandler}
      quantity={cartQuantity}
      title={"Cart"}
      classes={buttonClasses}
      classIcon={iconClass}
      action={""}
    />
  );
};

export default CartButton;
