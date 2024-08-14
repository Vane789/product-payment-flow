const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        const updatedCart = state.cart.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: action.payload.quantity },
          ],
        };
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
