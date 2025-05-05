const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
require("dotenv").config();
const stripe = new Stripe(process.env.STRIP_SECRET_KEY);

router.post("/", async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
