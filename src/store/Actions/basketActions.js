//Action Types
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CLEAR_BASKET = "CLEAR_BASKET";
import firebase from "../../firebase/firebase";
import Axios from "axios";

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

export const clearBasket = () => {
  return { type: CLEAR_BASKET };
};

// export const createOrder = (basketData = {}) => {
//   return (dispatch) => {
//     const { items = {}, totalAmount = 0 } = basketData;

//     const newOrder = {
//       items,
//       totalAmount,
//     };
//     const response = await Axios.post("/api/neworder", { newOrder });

//       if (response.status === 200) {
//         const orderID = await response.data.orderid ;
//       }else{

//       }

//     // return firebase
//     //   .database()
//     //   .ref("orders")
//     //   .push(newOrder)
//     //   .then((ref) => {
//     //     // dispatch(
//     //     //   addPost({
//     //     //     id: ref.key,
//     //     //     ...post,
//     //     //   })
//     //     // );
//     //     console.log("New Order", ref);
//     //   });
//   };
// };
