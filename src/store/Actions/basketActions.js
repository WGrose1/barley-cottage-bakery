//Action Types
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

export const addItem = (product, quantity) => {
  return {
    type: ADD_ITEM,
    product,
    quantity,
  };
};

export const removeItem = (productId) => {
  return { type: REMOVE_ITEM, pid: productId };
};
