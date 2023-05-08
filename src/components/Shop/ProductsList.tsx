import Product from "./Product";
import { useAppSelector } from "../Hooks/redux-hooks";
import useFetchPLP from "../Hooks/useFetchPLP";
import { ListItems, TApiResponse } from "../../Models/types";
import { PLP_URL } from "../../Models/config";
import { useState } from "react";
import { FilterIcon } from "../../assets/IconsSvg";
import Spinner from "../UI/Spinner";

const ProductsList: React.FC<ListItems | any> = (props) => {
  const notification = useAppSelector((state) => state.ui.notification);
  const [category, setCategory] = useState<string>("");
  const wishId = props.wishList.items.map((wish: ListItems) => wish.id);

  const handleCategory = (e: any) => {
    setCategory(e.target.value);
  };
  const products: TApiResponse = useFetchPLP(PLP_URL);

  const plpData =
    !category || category === "All"
      ? products.data
      : products.data?.filter(
          (product: ListItems) => product.category === category
        );

  const mappedProducts = plpData?.map((product: ListItems) => (
    <Product
      key={product.id}
      id={product.id}
      image={product.image}
      title={product.title}
      price={product.price}
      category={product.category}
      isWished={wishId.includes(product.id)}
    />
  ));

  return (
    <>
      {!notification && (
        <div className="categories" aria-label="categories">
          <header>
            {category !== "All" ? <p>{category.toUpperCase()}</p> : <p></p>}
          </header>
          <div className="categories__filter">
            <label htmlFor="category">
              Filter <FilterIcon />
            </label>
            <select name="category" id="category" onChange={handleCategory}>
              <option value="All">All categories</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
            </select>
          </div>
        </div>
      )}
      {products.error && (
        <p className="went-wrong">Ups!... Something went wrong ⛔️</p>
      )}
      {products.loading && (
        <div className="loading">
          <Spinner />
          <p>Loading...</p>
        </div>
      )}
      <div className="plp-container" aria-label="products list">
        {!products.loading && mappedProducts}
      </div>
    </>
  );
};

export default ProductsList;
