import React from "react";
import { useAppDispatch } from "../Hooks/redux-hooks";
import { cartActions } from "../../store/cart-slice";
import Button from "../UI/Button";
import { wishActions } from "../../store/wishList-slice";
import { ListItems } from "../../Models/types";

const Product: React.FC<ListItems> = (props) => {
  const dispatch = useAppDispatch();

  const { id, title, price, image, isWished } = props;

  const itemObj = {
    id,
    title,
    price,
    image,
    quantity: 1,
    totalPrice: price,
    isWished,
  };

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(itemObj));
  };

  const addWishHandler = () => {
    dispatch(wishActions.addToWishList(itemObj));
  };

  const removeWishHandler = () => {
    dispatch(wishActions.removeFromWishList(id));
  };

  const wishAria = !isWished
    ? "add item to wish list"
    : "remove item from wish list";

  return (
    <article className="product">
      <div className="img-container">
        <img src={image} alt={title} className="product__image" />
      </div>
      <div className="description">
        <h3 className="product__title">{title}</h3>
        <p className="product__price">Price €{price}</p>
        <div className="product__actions">
          <div
            className="product__actions--button"
            aria-label="add item to cart"
          >
            <Button
              onClick={addToCartHandler}
              title={"Cart"}
              action={"Add cart"}
              classes={"button button-product"}
              classIcon={"icon"}
              quantity={""}
            />
          </div>
          <div className="product__actions--button" aria-label={wishAria}>
            {!isWished && (
              <Button
                onClick={addWishHandler}
                title={"Wish List"}
                classes={"button"}
                classIcon={"icon-big"}
                quantity={""}
                action={""}
              />
            )}
            {isWished && (
              <Button
                onClick={removeWishHandler}
                title={"Wish List"}
                action={"Remove wish"}
                classes={"button button-product"}
                classIcon={"icon icon-red"}
                quantity={""}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Product;
