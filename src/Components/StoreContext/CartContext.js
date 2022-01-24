import React, { useReducer } from "react";
import { createContext } from "react";
import { cartReducer } from "./CartReducer";

export const Cart = createContext();

const CartContext = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemHandler = (item) => {
    cartDispatch({ type: "ADD", item: item });
  };

  const removeItemHandler = (title) => {
    cartDispatch({ type: "REMOVE", title: title });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    userId: "",
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <Cart.Provider value={cartContext}>{props.children}</Cart.Provider>;
};

export default CartContext;
