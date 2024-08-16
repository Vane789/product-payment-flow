import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import "./Backdrop.scss";
import { useNavigate } from "react-router-dom";
import { postPayment } from "../../services/api";

const Summary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const shippingCost = 5000;
  const totalAmount = calculateTotal() + shippingCost;
  const handlePayment = () => {
    const user = JSON.parse(localStorage.getItem("userPayload")) || [];
    const payment = JSON.parse(localStorage.getItem("paymentPayload")) || [];
    const product = JSON.parse(localStorage.getItem("carrito")) || [];

    const payload = {
      user,
      payment,
      product,
    };
    console.log("payload hacia backend:: ", payload);
    postPayment(payload);
    setLoading(true);

    //API proceso de pago
    setTimeout(() => {
      // Después de la operación de pago
      setLoading(false);
      navigate("/final-status");
    }, 2000);
  };

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Typography variant="h6" className="typography">
          Summary
        </Typography>
        <Divider className="divider" />
        <Grid container spacing={2} className="grid-container">
          <div className="titles">
            <Typography variant="p" className="typography-producto">
              Producto
            </Typography>
            <Typography variant="p" className="typography-subtotal">
              Subtotal
            </Typography>
          </div>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id} className="grid-item">
              <div className="item-details">
                <Typography
                  variant="body2"
                  className="items-description-quantity"
                >
                  {item.description} x {item.quantity}
                </Typography>
                <Typography variant="body2" className="item-price">
                  ${item.price}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
        <Divider className="divider" />
        <div className="card-total">
          <Typography variant="body1" className="typography">
            Subtotal: ${calculateTotal()}
          </Typography>
          <Typography variant="body1" className="typography">
            Envío: ${shippingCost}
          </Typography>
          <Typography variant="h6" className="total">
            Total: ${totalAmount}
          </Typography>
          {loading ? (
            <div className="loading-container">
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={handlePayment}
            >
              Payment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;
