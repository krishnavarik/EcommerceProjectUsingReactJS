import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import CartContext from "./Components/StoreContext/CartContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <CartContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartContext>,
  document.getElementById("root")
);
