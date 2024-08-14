import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import "./Backdrop.scss";

const Summary = () => {
  const [cartItems, setCartItems] = useState([]);

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
          <Button variant="contained" color="primary" className="button">
            Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;
