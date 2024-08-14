const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedCart;
      if (itemIndex >= 0) {
        updatedCart = state.cart.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedCart = [
          ...state.cart,
          { ...action.payload, quantity: action.payload.quantity },
        ];
      }

      localStorage.setItem("carrito", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };

    case "REMOVE_ITEM":
      const cartAfterRemoval = state.cart.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("carrito", JSON.stringify(cartAfterRemoval));

      return {
        ...state,
        cart: cartAfterRemoval,
      };

    case "UPDATE_ITEM_QUANTITY":
      const cartWithUpdatedQuantity = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      localStorage.setItem("carrito", JSON.stringify(cartWithUpdatedQuantity));

      return {
        ...state,
        cart: cartWithUpdatedQuantity,
      };

    case "INITIALIZE_CART":
      localStorage.setItem("carrito", JSON.stringify(action.payload));

      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
