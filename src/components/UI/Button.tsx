import React from "react";
import { CartIcon, WishIcon } from "../../assets/IconsSvg";
import { BtnPropsType } from "../../Models/types";

const Button: React.FC<BtnPropsType> = (props) => {
  const heartIcon = props.quantity === 0 ? "icon-big" : "icon";
  const heartColor =
    props.quantity > 0 ? `${props.classIcon} icon-red` : props.classIcon;
  const cartIcon = props.quantity > 0 ? props.classIcon : "icon-big";

  return (
    <button onClick={props.onClick} className={props.classes}>
      {props.title === "Cart" && (
        <span className={`${cartIcon}  `}>
          <CartIcon />
        </span>
      )}
      {props.title === "Wish List" && (
        <span className={`${heartColor} ${heartIcon}`}>
          <WishIcon />
        </span>
      )}
      {props.title === "Close" && (
        <span className="button__title">{props.title}</span>
      )}
      {props.action === "Add cart" && <span>+</span>}
      {props.quantity > 0 && (
        <span className="button__quantity">{props.quantity}</span>
      )}
    </button>
  );
};

export default Button;
