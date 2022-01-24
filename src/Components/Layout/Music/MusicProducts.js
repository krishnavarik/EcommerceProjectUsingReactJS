import React, { useContext } from "react";
import { Cart } from "../../StoreContext/CartContext";
import axios from "axios";

import "./MusicProducts.css";

const productsArr = [
  {
    album: "Album 1",
    title: "POP Music",
    price: 100,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/01/22/album-1866523_960_720.jpg",
  },

  {
    album: "Album 2",
    title: "Instrumental",
    price: 50,
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/06/04/17/53/piano-362251_960_720.jpg",
  },

  {
    album: "Album 3",
    title: "POP",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },

  {
    album: "Album 4",
    title: "Soft Music",
    price: 100,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/01/10/21/05/mic-1132528_960_720.jpg",
  },
];

const MusicProducts = () => {
  const cartCtx = useContext(Cart);

  function addItemHandler(product) {
    cartCtx.addItem({ ...product, quantity: 1 });

    console.log(`Id: ${cartCtx.userId}`);
    axios
      .post(`https://crudcrud.com/api/24ff8ed06ba043989f9543753e1f880a/cart3`, {
        ...product,
        quantity: 1,
      })
      .then((response) => {
        console.log(`Axios: ${response}`);
      })
      .catch((err) => {
        console.log(`err: ${err}`);
      });
  }

  const removeItemHandler = (items) => {
    cartCtx.removeItem(items.title);
  };

  return (
    <section className="musicSection">
      {productsArr.map((items) => {
        return (
          <ul key={items.album} className="musicContainer">
            <h3>{items.album}</h3>
            <li className="musicImage">
              <img src={items.imageUrl} alt="Music Pictures" />
            </li>
            <li className="musicDetail">
              <span>
                {items.title} : ${items.price}
              </span>
              {cartCtx.items.some((item) => item.title === items.title) ? (
                <button
                  className="musicBtn"
                  onClick={() => removeItemHandler(items)}
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  className="musicBtn"
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

export default MusicProducts;
