import React, { useContext } from "react";
import { Cart } from "../../StoreContext/CartContext";
import "./MerchProducts.css";

const merchArr = [
  {
    title: "T-Shirt",
    price: 19.99,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Shirt.png",
  },

  {
    title: "Printed Cup",
    price: 6.99,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Cofee.png",
  },
];

const MerchProducts = () => {
  const cartCtx = useContext(Cart);

  function addItemHandler(product) {
    cartCtx.addItem({ ...product, quantity: 1 });
  }

  const removeItemHandler = (items) => {
    cartCtx.removeItem(items.title);
  };

  return (
    <section className="merchSection">
      {merchArr.map((items) => {
        return (
          <ul key={items.title} className="merchContainer">
            <h3>{items.title}</h3>
            <li className="merchImage">
              <img src={items.imageUrl} alt="Merchandise Pictures" />
            </li>

            <li className="merchDetail">
              <span>${items.price}</span>
              {cartCtx.items.some((item) => item.title === items.title) ? (
                <button
                  className="merchBtn"
                  onClick={() => removeItemHandler(items)}
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  className="merchBtn"
                  onClick={() => addItemHandler(items)}
                >
                  ADD TO CART
                </button>
              )}
            </li>
          </ul>
        );
      })}
    </section>
  );
};

export default MerchProducts;
