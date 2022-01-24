import { useState, useEffect, useContext } from "react";
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import Store from "./Components/Pages/Store";
import HomePage from "./Components/Pages/HomePage";
import About from "./Components/Pages/About";
import { Routes, Route, Navigate } from "react-router-dom";

import CartList from "./Components/Cart/CartList";
import Contact from "./Components/Pages/Contact";
import Login from "./Components/Pages/Login";
import { Cart } from "./Components/StoreContext/CartContext";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const style = {
    color: "white",
    backgroundColor: "#383e3e",
    borderRadius: "5px",
    border: "none",
    height: "34px",
    width: "244px",
    cursor: "pointer",
    alignItem: "center",
    marginLeft: "2%",
    marginTop: "5%",
  };

  const [cartItems, setCartItems] = useState(false);
  const cartCtx = useContext(Cart);
  // const {cart, setCart, userId, setUserId } = useContext(Cart);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      cartCtx.userId = localStorage.getItem("userId");
    }
  }, [cartCtx]);

  const cartItemsClose = () => {
    setCartItems(false);
  };

  useEffect(() => {
    if (localStorage.getItem("TokenId")) {
      setIsloggedIn(true);
    }
  }, []);

  const CartItems = () => {
    setCartItems(true);
  };

  const putRequestHandler = async (contact) => {
    const response = await fetch(
      "https://react-http-7d042-default-rtdb.firebaseio.com/contact.json",
      {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Header openCart={setCartItems} />
      {cartItems && <CartList Close={cartItemsClose} />}

      <Routes>
        <Route exact path="/" element={<Login checkLogin={setIsloggedIn} />} />
        {isLoggedIn && <Route exact path="/store" element={<Store />} />}
        <Route exact path="/about" element={<About />} />
        <Route
          exact
          path="/contact"
          element={<Contact putRequest={putRequestHandler} />}
        />
        {/* <Route
          exact
          path="/"
          element={<Login checkLogin={setIsloggedIn} />}
        /> */}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        )}
      </Routes>

      <button style={style} onClick={CartItems}>
        See The Cart
      </button>

      <Footer />
    </>
  );
}

export default App;
