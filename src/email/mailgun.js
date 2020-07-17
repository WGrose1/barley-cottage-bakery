const apiKey = process.env.MAILGUN_API_KEY;
const DOMAIN = "barleycottage.co.uk";
const mailgun = require("mailgun-js")({
  apiKey: apiKey,
  domain: DOMAIN,
  host: "api.eu.mailgun.net",
});

const sendOrderConfirmationEmail = async (
  firstName,
  LastName,
  email,
  orderDetails
) => {
  const details = JSON.stringify(orderDetails);
  const data = {
    from: "Barley Cottage Bakery <orders@barleycottage.co.uk>",
    to: "willgrose@outlook.com",
    subject: "Your Order Confirmation",
    text: `Hi ${firstName},\nThankyou for placing your order number  . `,
  };
  console.log(firstName, LastName, email, orderDetails);
  await mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};

const sendInternalOrderReceivedEmail = async ({
  firstName,
  lastName,
  message,
  email,
}) => {
  const data = {
    from: `Enquiries <orders@barleycottage.co.uk>`,
    to: "willgrose@outlook.com",
    subject: `Enquiry from ${firstName} ${lastName}`,
    text: `New Enquiry from: ${firstName} ${lastName}\nEmail: ${email}\nMessage:\n${message}`,
  };
  await mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};

module.exports = {
  sendOrderConfirmationEmail,
  sendInternalOrderReceivedEmail,
};
