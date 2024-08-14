// pages/CartPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateItemQuantity } from "../store/actions/carAction";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard/ProductCard";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cart || []);
  const dispatch = useDispatch();

  console.log("cartItems ", cartItems);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, change) => {
    console.log("change ", change);
    const item = cartItems.find((item) => item.id === id);

    if (item) {
      dispatch(updateItemQuantity(id, item.quantity + change));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(3);

  return (
    <>
      <Header cartCount={cartItems.length} />
      <h1>Carrito...</h1>
      <Grid container spacing={2}>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Grid container justifyContent="center">
                <ProductCard
                  ToPay={false}
                  product={item}
                  quantity={item.quantity}
                  onQuantityChange={handleQuantityChange}
                />
                <button onClick={() => handleRemove(item.id)}>Eliminar</button>
              </Grid>
            </Grid>
          ))
        )}
      </Grid>
      <div>
        <p>Total: ${total}</p>
        <Link to="/checkout">
          <button>Ir a Pagar</button>
        </Link>
      </div>
    </>
  );
};

export default CartPage;
