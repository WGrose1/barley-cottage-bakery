import { ADD_ITEM, REMOVE_ITEM } from "../Actions/basketActions";
import CartItem from "../../models/CartItem";
// const testBasket = [
//   { name: "Dark Chocolate Brownie", price: 10.99 },
//   { name: "Brownie", price: 10.99 },
//   { name: "Milk  Brownie", price: 10.99 },
// ];

const defaultState = {
  items: {},
  totalAmount: 0,
};

const basketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const addQuantity = action.quantity;
      const addPrice = action.quantity * prodPrice;
      console.log(addPrice);

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + addQuantity,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + addPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          addQuantity,
          prodPrice,
          prodTitle,
          addPrice
        );
      }
      return {
        ...state,
        // items: [ ...state.items, {addedProduct.id: {updatedOrNewCartItem ],
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addPrice,
      };
    case REMOVE_ITEM:
      return { ...state };
    default:
      return { ...state };
  }
};

export default basketReducer;
