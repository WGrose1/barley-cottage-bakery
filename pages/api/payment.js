// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")(
  "sk_test_51GulktI1HACdLbtzo60UvAyQvIgkNfvoFnPnElzlXVboeEk0YFKDFMvCx5bRul5nfbriSDYjwzD0eInl260i6ufJ00Gt9Gor7w"
);

const getPaymentIntent = async (amount) => {
  //todo calc server side !!!
  return await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "gbp",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });
};

export default async (req, res) => {
  const amount = req.body.amount;

  const intent = await getPaymentIntent(amount);
  //console.log("intent", intent);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ client_secret: intent.client_secret });
  //res.end();
};

// export default (req, res) => {
//   if (req.method === "POST") {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//   }
// };

// export default (req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ name: "John Doe" }));
// };
