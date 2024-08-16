import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateItemQuantity,
  initializeCart,
} from "../store/actions/carAction";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard/ProductCard";
import "../scss/layout/CartPage.scss";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cart || []);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    if (storedCart.length > 0) {
      dispatch(initializeCart(storedCart));
    }
  }, [dispatch]);

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
      <h1>Carrito</h1>
      <Grid container spacing={2}>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={2} key={item.id}>
              <Grid container justifyContent="center">
                <ProductCard
                  showButtonToPay={false}
                  product={item}
                  quantity={item.quantity}
                  onQuantityChange={handleQuantityChange}
                  isCartPage={true}
                  onDelete={handleRemove}
                />
              </Grid>
            </Grid>
          ))
        )}
      </Grid>
      <div className="cart-page-total-container">
        <p>Subtotal: ${total}</p>
        <Link to="/payment">
          <button>Checkout</button>
        </Link>
      </div>
    </>
  );
};

export default CartPage;
