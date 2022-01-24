import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Cart } from "../StoreContext/CartContext";

const Login = (props) => {
  const loginEmailRef = useRef();
  const loginPassRef = useRef();
  const navigate = useNavigate();
  const cartCtx = useContext(Cart);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredLoginEmail = loginEmailRef.current.value;
    const enteredLoginPass = loginPassRef.current.value;

    cartCtx.userId = (Math.random() + 1).toString(36).substring(7);
    localStorage.setItem("userId", cartCtx.userId);
    // setUserId(userSavedId);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_moyHG8twZqc8YOxjyWkTaJiLUXd-vNg",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredLoginEmail,
          password: enteredLoginPass,
          returnSecureToke: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Success");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("TokenId", data.idToken);
        props.checkLogin(true);
        navigate("/store");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form
        onSubmit={submitHandler}
        style={{ marginTop: "2%", textAlign: "center", display: "block" }}
      >
        <label htmlFor="loginInput">Email: </label>
        <br />
        <input type="text" id="loginInput" ref={loginEmailRef}></input>
        <br />
        <label htmlFor="loginPass">Password: </label>
        <br />
        <input type="password" id="loginPass" ref={loginPassRef}></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
