import React from "react";
import { cartActions } from "../../store/cart-slice";
import { wishActions } from "../../store/wishList-slice";
import { useAppDispatch, useAppSelector } from "../Hooks/redux-hooks";

const PopupItem: React.FC<{
  item: {
    id: string;
    title: string;
    image: string;
    quantity: number;
    total: number;
    price: number;
    isWished: boolean;
  };
}> = (props) => {
  const dispatch = useAppDispatch();

  const { id, title, quantity, total, price, image } = props.item;

  const showCart = useAppSelector((state) => state.ui.showCart);

  const removeItems = showCart
    ? cartActions.removeItemFromCart
    : wishActions.removeFromWishList;

  const removeItemHandler = () => {
    dispatch(removeItems(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        image,
        quantity: 1,
        totalPrice: price,
        isWished: false,
      })
    );
  };

  return (
    <li className="item">
      <header className="item__header">
        <img src={image} alt={title} className="item__header-img" />
        <figcaption className="item__header-title">{title}</figcaption>
      </header>
      <main className="item__main">
        <div className="item__main-amount">
          {showCart && (
            <div>
              x <span>{quantity}</span>
            </div>
          )}
          <div>
            ${total.toFixed(2)} {showCart && <span>(${price}/item)</span>}
          </div>
        </div>
        <div className="item__main-actions">
          <button onClick={removeItemHandler}>
            Remove {quantity > 1 ? "x1" : ""}
          </button>
          <button onClick={addItemHandler}>
            {showCart ? "Add +" : "Add to Cart +"}
          </button>
        </div>
      </main>
    </li>
  );
};

export default PopupItem;
