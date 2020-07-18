import bakeItems from "../../src/BakeData";
import firebase from "../../src/firebase/firebase";
const {
  sendOrderConfirmationEmail,
  sendInternalOrderReceivedEmail,
} = require("../../src/email/mailgun");

export default async (req, res) => {
  console.log(req.body.newOrder);
  let orderReference;
  await firebase
    .database()
    .ref("orders")
    .push(req.body.newOrder)
    .then((ref) => {
      // dispatch(
      //   addPost({
      //     id: ref.key,
      //     ...post,
      //   })
      // );
      orderReference = ref.key;
      console.log("New Order", ref.key);
      // sendOrderConfirmationEmail("Will", "Grose", "sdsa", req.body.newOrder);
    });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ orderid: orderReference });
  //res.end();
};
