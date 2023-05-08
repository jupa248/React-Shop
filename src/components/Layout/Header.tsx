import { Shop } from "../../assets/IconsSvg";
import CartButton from "./CartButton";
import WishListButton from "./WishListButton";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <Shop /> React Shop
      </h1>
      <nav className="header__nav">
        <ul className="header__ul">
          <li>
            <CartButton aria-expanded="false" />
          </li>
          <li>
            <WishListButton aria-expanded="false" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
