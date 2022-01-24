import React, { useContext } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { Cart } from "../../StoreContext/CartContext";
import axios from "axios";
import "./Navlink.css";

const Header = (props) => {
  const cartCtx = useContext(Cart);

  const numberOfItemsInCart = cartCtx.items.length;

  const showCartItem = () => {
    if (localStorage.getItem("userId")) {
      props.openCart(true);
      axios
        .get(`https://crudcrud.com/api/24ff8ed06ba043989f9543753e1f880a/cart3`)
        .then((response) => {
          // console.log(`userId: ${cartCtx.userId}`);
          // console.log('res', response.data)
          // cartCtx.addItem({})
          // console.log('carti',cartCtx.items)
          response.data.map((item) => {
            return cartCtx.addItem({ ...item, quantity: 1 });
          });
        })
        .catch((err) => {
          console.log(`err: ${err}`);
        });
    } else {
      alert("Please Login First");
    }
  };

  return (
    <div className="headBody">
      <div className="innerHeader">
        <div className="logoContainer">
          <span>EcomStore</span>
        </div>
        <ul className="navigation">
          {/* <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/"><li>Home</li></NavLink> */}
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/store"
          >
            <li>Store</li>
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/about"
          >
            <li>About</li>
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/contact"
          >
            <li>Contact</li>
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/"
          >
            <li>Login</li>
          </NavLink>
          <button className="cartBtn" onClick={showCartItem}>
            <li>
              Cart <span>{numberOfItemsInCart}</span>
            </li>
          </button>
        </ul>
      </div>
      <h1>The Generics</h1>
    </div>
  );
};

export default Header;
