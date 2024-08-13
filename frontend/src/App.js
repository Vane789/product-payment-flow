import { useEffect, useState } from "react";
import Header from "./components/Header/Header"
import { getProducts } from "./services/api"
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from  './store/actions/carAction';

function App() {

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  console.log("cart ", cart)

  useEffect( () => {
    setProducts(getProducts());
  },[cart]) 

  function handleAddToCart() {
    dispatch(addItem({"llave":"valor"}))
    console.log("click en agregar al carrito")
  }

  return (
   <>
    <Header/>
    { /* Mostrar los productos*/}
    {products && products.map( product => {
       return(
        <div key={product.id}>
            <img src={product.img} alt={product.name} />
            <h2>{product.description}</h2>
            <p>{product.price}</p>
            <h2>{product.stock}</h2>
            <p> + 1 -</p>
            <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
       )
    })}
   </>
  );
}

export default App;
