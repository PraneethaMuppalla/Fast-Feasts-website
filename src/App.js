import React, { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./context/CartProvider";

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    setCartVisible(true);
  };

  const hideCardHandler = () => {
    setCartVisible(false);
  };
  return (
    <CartProvider>
      {cartVisible && <Cart onHideCart={hideCardHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
