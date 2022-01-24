import React from "react";
import "./Cart.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Cart } from "../StoreContext/CartContext";
import { useContext } from "react";

const CartList = (props) => {
  const cartCtx = useContext(Cart);

  const styleBtn = {
    marginLeft: "72%",
    height: "40px",
    marginTop: "2%",
  };

  const increaseQuantityHandler = (product) => {
    cartCtx.addItem({ ...product, quantity: 1 });
  };

  const decreaseQuantityHandler = (product) => {
    cartCtx.removeItem(product.title);
  };

  return (
    <section className="cartBody">
      <Button style={styleBtn} onClick={props.Close}>
        X
      </Button>
      <h2 className="cartHeading">CART</h2>
      <h4>Total Price: ${cartCtx.totalAmount}</h4>

      <Row>
        <Col xs="4">
          <span className="headText">Item</span>
          <hr />
        </Col>
        <Col xs="4">
          <span className="headText">Price</span>
          <hr />
        </Col>
        <Col xs="4">
          <span className="headText">Quantity</span>
          <hr />
        </Col>
      </Row>

      {cartCtx.items.map((items) => {
        return (
          <Container key={items.title} style={{ marginTop: "20px" }}>
            <Row>
              <Col xs="4">
                <Col xs="6">
                  <img
                    className="cartImages"
                    src={items.imageUrl}
                    alt={items.title}
                  />
                </Col>
                <Col xs="6" className="cartTitle">
                  {items.title}
                </Col>
              </Col>

              <Col xs="4">${items.price}</Col>
              <Col xs="4">
                <Col xs="3">
                  <button
                    type="button"
                    className="listBtn"
                    onClick={() => increaseQuantityHandler(items)}
                  >
                    +
                  </button>
                </Col>
                <Col xs="6">{items.quantity}</Col>
                <Col xs="3">
                  <button
                    type="button"
                    className="listBtn"
                    onClick={() => decreaseQuantityHandler(items)}
                  >
                    -
                  </button>
                </Col>
              </Col>
            </Row>
          </Container>
        );
      })}
    </section>
  );
};

export default CartList;
