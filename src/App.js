import './App.css';
import ItemsList from './Components/items/ItemsList';
import MainHeader from './Components/MainHeader/MainHeader';
import Cart from './Components/Cart/Cart';
import { CartTotalContextProvider } from './store/cart-total-context';
import { useState } from 'react';

function App() {
  const[showCart,setShowCart] = useState(false);
  
  const openCartHandler = () =>{
    setShowCart(true);
  }
  const closeCartHandler = () =>{
    setShowCart(false);
  }

  return (
      <CartTotalContextProvider>
          <MainHeader onOpenCart = {openCartHandler}/>
        <main>
          {showCart && <Cart onCloseCart = {closeCartHandler}/>}
          <ItemsList/>
        </main>
      </CartTotalContextProvider>
  )
}

export default App;
