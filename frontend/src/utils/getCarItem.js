export const getCartItems = (dispatch, action) => {
  const storedCart = JSON.parse(localStorage.getItem("carrito")) || [];
  if (storedCart.length > 0) {
    dispatch(action(storedCart));
    const result = storedCart.length;
    return result;
  }
};
