import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51N6zoTAmM8GrdizRXP4vzzGoWODWZKYvWIsvSfrgVY0VsknMzeCebUwK7D56SJ7WpgS9idcTomUWEDZgX8pufdYG00k09h98Mo"
);

export const payments = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 4995,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
