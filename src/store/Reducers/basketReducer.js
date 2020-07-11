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

      const totalCartAmount =
        Math.round((state.totalAmount + addPrice).toFixed(2) * 100) / 100;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + addQuantity,
          prodPrice,
          prodTitle,
          Math.round(
            (state.items[addedProduct.id].sum + addPrice).toFixed(2) * 100
          ) / 100
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          addQuantity,
          prodPrice,
          prodTitle,
          addPrice
        );
      }

      const newItems = {
        ...state.items,
        [addedProduct.id]: updatedOrNewCartItem,
      };

      // try {
      //   const serializedState = JSON.stringify(newItems);
      //   localStorage.setItem("barleyCottageBasket", serializedState);
      // } catch {
      //   // ignore write errors
      // }

      // try {
      //   const serializedState = totalCartAmount.toString();
      //   localStorage.setItem("barleyCottageBasketTotal", serializedState);
      // } catch {
      //   // ignore write errors
      // }

      return {
        ...state,
        // items: [ ...state.items, {addedProduct.id: {updatedOrNewCartItem ],
        // items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        items: newItems,
        totalAmount: totalCartAmount,
        // totalAmount: state.totalAmount + addPrice,
      };

    case REMOVE_ITEM:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;

      // if (currentQty > 1) {
      //   // need to reduce it, not erase it
      //   const updatedCartItem = new CartItem(
      //     selectedCartItem.quantity - 1,
      //     selectedCartItem.productPrice,
      //     selectedCartItem.productTitle,
      //     selectedCartItem.sum - selectedCartItem.productPrice
      //   );
      //   updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      // } else {
      //   updatedCartItems = { ...state.items };
      //   delete updatedCartItems[action.pid];
      // }
      updatedCartItems = { ...state.items };
      delete updatedCartItems[action.pid];

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.sum,
        totalAmount:
          Math.round(
            (state.totalAmount - selectedCartItem.sum).toFixed(2) * 100
          ) / 100,
      };

    default:
      return { ...state };
  }
};

export default basketReducer;
