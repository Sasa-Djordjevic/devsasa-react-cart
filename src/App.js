import React, {useState} from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./context/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const closeCartHandler = () => {
    setShowCart(false);
  };

  const openCartHandler = () => {
    setShowCart(true);
  };

  return (
    <CartProvider>
      {showCart && <Cart onCloseCart={closeCartHandler}/>}
      <Header onOpenCart={openCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
