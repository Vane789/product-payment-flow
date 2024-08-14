import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { getProducts } from "../services/api";
import { useDispatch } from "react-redux";
import { addItem } from "../store/actions/carAction";
import ProductCard from "../components/ProductCard/ProductCard";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const [countProducts, setCountProducts] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function handleAddToCart(product) {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      const productWithQuantity = { ...product, quantity: quantity };
      dispatch(addItem(productWithQuantity));
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 0,
      }));
      setOpen(true);
      setCountProducts(countProducts + 1);
    }
  }

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 0) + change;
      return {
        ...prevQuantities,
        [productId]: Math.max(newQuantity, 0),
      };
    });
  };

  return (
    <>
      <Header cartCount={countProducts} />
      <h1>Amigurumis</h1>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Grid container justifyContent="center">
              <ProductCard
                ToPay={true}
                product={product}
                quantity={quantities[product.id] || 0}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Producto agregado al carrito
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductPage;
