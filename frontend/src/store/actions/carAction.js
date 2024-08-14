export const addItem = (item) => ({
  type: "ADD_TO_CART",
  payload: item,
});

export const removeItem = (id) => ({
  type: "REMOVE_ITEM",
  payload: id,
});

export const updateItemQuantity = (id, quantity) => ({
  type: "UPDATE_ITEM_QUANTITY",
  payload: { id, quantity },
});
