import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ProductCard.scss";

const ProductCard = ({
  showButtonToPay,
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  isCartPage,
  onDelete,
}) => (
  <Card className={`product-card`}>
    <CardMedia component="img" className="product-media" image={product.img} />
    <CardContent className="product-content">
      <Typography variant="h6" className="product-description">
        {product.description}
      </Typography>
      <Typography variant="h6" className="product-price">
        ${product.price}
      </Typography>
      <Typography variant="body2" className="product-stock">
        Stock: {product.stock}
      </Typography>
    </CardContent>
    <div className="quantity-container">
      <IconButton onClick={() => onQuantityChange(product.id, -1)}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1">{quantity}</Typography>
      <IconButton onClick={() => onQuantityChange(product.id, 1)}>
        <AddIcon />
      </IconButton>
    </div>
    {isCartPage && (
      <div>
        <IconButton
          className="delete-icon"
          onClick={() => onDelete(product.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )}
    {showButtonToPay && !isCartPage && (
      <Button
        className="add-to-cart-button"
        variant="contained"
        onClick={() => onAddToCart(product)}
      >
        Agregar al carrito
      </Button>
    )}
  </Card>
);

export default ProductCard;
