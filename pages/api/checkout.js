// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  //res.statusCode = 200;
  const intent = res.json({ client_secret: intent.client_secret }); // ... Fetch or create the PaymentIntent
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
